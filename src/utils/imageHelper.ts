const DEAD_HOSTS = [
  'placeimg.com',
  'dummyimage.com',
  'placehold.co',
];

function isPlaceholderUrl(url: string): boolean {
  for (let i = 0; i < DEAD_HOSTS.length; i++) {
    if (url.indexOf(DEAD_HOSTS[i]) !== -1) return true;
  }
  return false;
}

export function cleanImageUrl(images: string[]): string | null {
  if (!images || images.length === 0) return null;

  for (let i = 0; i < images.length; i++) {
    // eslint-disable-next-line no-useless-escape
    let url = images[i].replace(/[\[\]"\\]/g, '').trim();
    if (url && url.startsWith('http') && !isPlaceholderUrl(url)) {
      return url;
    }
  }

  return null;
}
