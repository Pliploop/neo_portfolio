export function youtubeId(url) {
  const m = url.match(/(?:youtu\.be\/|[?&]v=)([\w-]{11})/);
  return m ? m[1] : null;
}

export function youtubeEmbed(url) {
  return `https://www.youtube-nocookie.com/embed/${youtubeId(url)}?autoplay=1`;
}

export function soundcloudEmbed(url) {
  const params = new URLSearchParams({
    url, color: '#ff4a1c', auto_play: 'true', hide_related: 'true',
    show_comments: 'false', show_user: 'true', show_reposts: 'false', show_teaser: 'false', visual: 'true',
  });
  return `https://w.soundcloud.com/player/?${params.toString()}`;
}
