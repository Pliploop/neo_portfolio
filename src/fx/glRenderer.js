import { bayerMatrix } from './bayer';

const MAX_BLOBS = 6;

const VERT = `attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }`;

const FRAG = `precision mediump float;
uniform vec2 u_res;
uniform vec4 u_blobs[${MAX_BLOBS}];
uniform int u_count;
uniform float u_aspect;
uniform int u_mode;
uniform sampler2D u_bayer;
uniform sampler2D u_image;
uniform vec2 u_imgScale;
uniform vec2 u_imgOffset;
uniform float u_contrast;
uniform float u_gain;
uniform float u_fade;
uniform float u_noise;
uniform float u_step;
uniform float u_time;
uniform vec3 u_fg;
uniform vec3 u_bg;
void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  uv.y = 1.0 - uv.y;
  float v = 0.0;
  if (u_mode == 0) {
    for (int i = 0; i < ${MAX_BLOBS}; i++) {
      if (i >= u_count) break;
      vec4 b = u_blobs[i];
      vec2 d = vec2((uv.x - b.x) * u_aspect, uv.y - b.y);
      v += exp(-dot(d, d) / (b.z * b.z));
    }
    v = min(v, 1.0) * u_gain;
    float fd = 1.0 - smoothstep(0.18, 0.5, distance(uv, vec2(0.5)));
    v *= mix(1.0, fd, u_fade);
    float n = fract(sin(dot(gl_FragCoord.xy + u_step * 17.0, vec2(12.9898, 78.233))) * 43758.5453);
    v += (n - 0.5) * u_noise * step(0.02, v);
  } else {
    vec3 c = texture2D(u_image, uv * u_imgScale + u_imgOffset).rgb;
    v = 1.0 - dot(c, vec3(0.299, 0.587, 0.114));
    v = clamp((v - 0.5) * u_contrast + 0.5 + 0.07 * sin(uv.y * 9.0 - u_time * 1.3 + uv.x * 3.0), 0.0, 1.0);
  }
  float th = texture2D(u_bayer, gl_FragCoord.xy / 8.0).r;
  gl_FragColor = vec4(v > th ? u_fg : u_bg, 1.0);
}`;

let state;

export const PENDING = 'pending';

function shader(gl, type, src) {
  const sh = gl.createShader(type);
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  return sh;
}

function bayerTexture(gl) {
  const m = bayerMatrix(8).flat();
  const data = new Uint8Array(m.map((v) => Math.round(((v + 0.5) / 64) * 255)));
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, 8, 8, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  return tex;
}

// Starts compiling without waiting on it: status checks are deferred to finish(),
// so with KHR_parallel_shader_compile the main thread never blocks on the driver.
function init() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl', { antialias: false, premultipliedAlpha: false, failIfMajorPerformanceCaveat: true });
  if (!gl) return null;
  const vs = shader(gl, gl.VERTEX_SHADER, VERT);
  const fs = shader(gl, gl.FRAGMENT_SHADER, FRAG);
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); state = undefined; });
  return {
    canvas, gl, prog, shaders: [vs, fs], textures: new WeakMap(), ready: false,
    parallel: gl.getExtension('KHR_parallel_shader_compile'),
  };
}

function finish(st) {
  if (st.ready) return true;
  const { gl, prog, parallel } = st;
  if (parallel && !gl.getProgramParameter(prog, parallel.COMPLETION_STATUS_KHR)) return false;
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const logs = st.shaders.map((sh) => gl.getShaderInfoLog(sh)).filter(Boolean).join('\n');
    throw new Error(gl.getProgramInfoLog(prog) || logs || 'link failed');
  }
  gl.useProgram(prog);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'a_pos');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = (name) => gl.getUniformLocation(prog, name);
  st.uniforms = Object.fromEntries(['u_res', 'u_blobs', 'u_count', 'u_aspect', 'u_mode', 'u_bayer', 'u_image',
    'u_imgScale', 'u_imgOffset', 'u_contrast', 'u_gain', 'u_fade', 'u_noise', 'u_step', 'u_time', 'u_fg', 'u_bg'].map((n) => [n, u(n)]));
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, bayerTexture(gl));
  gl.uniform1i(st.uniforms.u_bayer, 0);
  gl.uniform1i(st.uniforms.u_image, 1);
  st.ready = true;
  return true;
}

function imageTexture({ gl, textures }, image) {
  if (textures.has(image)) return textures.get(image);
  const tex = gl.createTexture();
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  textures.set(image, tex);
  return tex;
}

export function hasWebGL() {
  if (state === undefined) state = init();
  return Boolean(state);
}

export function renderDither(opts) {
  if (!hasWebGL()) return null;
  try {
    if (!finish(state)) return PENDING;
  } catch (err) {
    console.error('[fx] WebGL program failed, using CPU dither', err);
    state = null;
    return null;
  }
  const { canvas, gl, uniforms: U } = state;
  const { width, height, mode, positions = [], aspect, image, cover, fg, bg, contrast = 1, gain = 1, fade = false, noise = 0, step = 0, time = 0 } = opts;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  gl.viewport(0, 0, width, height);
  gl.uniform2f(U.u_res, width, height);
  gl.uniform1f(U.u_aspect, aspect);
  gl.uniform3f(U.u_fg, fg[0] / 255, fg[1] / 255, fg[2] / 255);
  gl.uniform3f(U.u_bg, bg[0] / 255, bg[1] / 255, bg[2] / 255);
  gl.uniform1f(U.u_noise, noise);
  gl.uniform1f(U.u_step, step);
  gl.uniform1f(U.u_time, time);
  if (mode === 'image' && image) {
    gl.uniform1i(U.u_mode, 1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, imageTexture(state, image));
    gl.uniform2f(U.u_imgScale, cover.scale[0], cover.scale[1]);
    gl.uniform2f(U.u_imgOffset, cover.offset[0], cover.offset[1]);
    gl.uniform1f(U.u_contrast, contrast);
  } else {
    gl.uniform1i(U.u_mode, 0);
    gl.uniform1f(U.u_gain, gain);
    gl.uniform1f(U.u_fade, fade ? 1 : 0);
    const flat = new Float32Array(MAX_BLOBS * 4);
    positions.slice(0, MAX_BLOBS).forEach((p, i) => flat.set([p.x, p.y, p.r, 0], i * 4));
    gl.uniform4fv(U.u_blobs, flat);
    gl.uniform1i(U.u_count, Math.min(positions.length, MAX_BLOBS));
  }
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  return canvas;
}
