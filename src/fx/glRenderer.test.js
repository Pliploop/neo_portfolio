function fakeGl(canvas) {
  const textures = [];
  const gl = {
    canvas, textures,
    VERTEX_SHADER: 1, FRAGMENT_SHADER: 2, COMPILE_STATUS: 3, LINK_STATUS: 4, ARRAY_BUFFER: 5, STATIC_DRAW: 6, FLOAT: 7,
    TEXTURE_2D: 8, TEXTURE0: 9, TEXTURE1: 10, LUMINANCE: 11, RGB: 12, UNSIGNED_BYTE: 13, UNPACK_ALIGNMENT: 14,
    TEXTURE_MIN_FILTER: 15, TEXTURE_MAG_FILTER: 16, TEXTURE_WRAP_S: 17, TEXTURE_WRAP_T: 18, NEAREST: 19, LINEAR: 20,
    REPEAT: 21, CLAMP_TO_EDGE: 22, TRIANGLE_STRIP: 23,
    createShader: () => ({}), shaderSource() {}, compileShader() {}, getShaderParameter: () => true,
    getExtension: () => null, getShaderInfoLog: () => '', getProgramInfoLog: () => '',
    createProgram: () => ({}), attachShader() {}, linkProgram() {}, getProgramParameter: () => true, useProgram() {},
    createBuffer: () => ({}), bindBuffer() {}, bufferData() {}, getAttribLocation: () => 0,
    enableVertexAttribArray() {}, vertexAttribPointer() {}, getUniformLocation: (_, n) => n,
    createTexture: () => { const t = { owner: gl }; textures.push(t); return t; },
    bindTexture: vi.fn(), pixelStorei() {}, texImage2D() {}, texParameteri() {}, activeTexture() {},
    uniform1i() {}, uniform1f() {}, uniform2f() {}, uniform3f() {}, uniform4fv() {}, viewport() {}, drawArrays() {},
  };
  return gl;
}

let contexts;
beforeEach(() => {
  vi.resetModules();
  contexts = [];
  const original = document.createElement.bind(document);
  vi.spyOn(document, 'createElement').mockImplementation((tag) => {
    const el = original(tag);
    if (tag === 'canvas') {
      el.getContext = (type, attrs) => {
        if (type !== 'webgl') return null;
        contexts.attrs = attrs;
        const gl = fakeGl(el); contexts.push(gl); return gl;
      };
    }
    return el;
  });
});
afterEach(() => vi.restoreAllMocks());

const opts = (image) => ({
  width: 4, height: 4, mode: 'image', image, aspect: 1,
  cover: { scale: [1, 1], offset: [0, 0] }, fg: [0, 0, 0], bg: [255, 255, 255],
});

test('after a context loss, image textures are recreated on the new context', async () => {
  const { renderDither } = await import('./glRenderer');
  const image = {};
  renderDither(opts(image));
  const first = contexts[0];
  first.canvas.dispatchEvent(new Event('webglcontextlost'));
  renderDither(opts(image));
  const second = contexts[1];
  expect(second).toBeDefined();
  const boundImageTextures = second.bindTexture.mock.calls.map(([, t]) => t).filter((t) => t && first.textures.includes(t));
  expect(boundImageTextures).toEqual([]);
});

test('hasWebGL reports false when re-init after loss fails', async () => {
  const { renderDither, hasWebGL } = await import('./glRenderer');
  renderDither(opts({}));
  contexts[0].canvas.dispatchEvent(new Event('webglcontextlost'));
  document.createElement.mockImplementation((tag) => {
    const el = document.implementation.createHTMLDocument('').createElement(tag);
    el.getContext = () => null;
    return el;
  });
  expect(hasWebGL()).toBe(false);
});

test('refuses software-rendered WebGL so slow devices get the static CPU frame', async () => {
  const { hasWebGL } = await import('./glRenderer');
  hasWebGL();
  expect(contexts.attrs).toMatchObject({ failIfMajorPerformanceCaveat: true });
});

test('with parallel shader compile, rendering waits for the program instead of blocking', async () => {
  const COMPLETION = 0x91b1;
  let done = false;
  document.createElement.mockImplementation((tag) => {
    const el = document.implementation.createHTMLDocument('').createElement(tag);
    if (tag === 'canvas') {
      el.getContext = (type) => {
        if (type !== 'webgl') return null;
        const gl = fakeGl(el);
        gl.getExtension = (name) => (name === 'KHR_parallel_shader_compile' ? { COMPLETION_STATUS_KHR: COMPLETION } : null);
        gl.getProgramParameter = (_, p) => (p === COMPLETION ? done : true);
        contexts.push(gl);
        return gl;
      };
    }
    return el;
  });
  const { renderDither, PENDING, hasWebGL } = await import('./glRenderer');
  expect(hasWebGL()).toBe(true);
  expect(renderDither(opts({}))).toBe(PENDING);
  done = true;
  expect(renderDither(opts({}))).toBe(contexts[0].canvas);
});
