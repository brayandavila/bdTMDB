export function getImagePath(path: string): string {
  if (typeof path === 'undefined' || path === null) {
    return 'assets/img/noimage.png';
  } else {
    return 'https://image.tmdb.org/t/p/w500/' + path;
  }
}
