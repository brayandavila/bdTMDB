export function getImagePath(path: string, size: string = 'w300'): string {
  if (typeof path === 'undefined' || path === null) {
    return 'assets/img/noimage.webp';
  } else {
    return `https://image.tmdb.org/t/p/${size}${path}`;
  }
}
