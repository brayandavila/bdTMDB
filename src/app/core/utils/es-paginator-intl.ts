import { MatPaginatorIntl } from '@angular/material/paginator';

const españolRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return `0 de ${length.toLocaleString()}`;
  }

  length = Math.max(length, 0);

  const startIndex: number = page * pageSize;

  const endIndex: number = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  const numberFormat = new Intl.NumberFormat('es-ES');
  const startIndexFormat = numberFormat.format(startIndex + 1);
  const endIndexFormat = numberFormat.format(endIndex);
  const lengthFormat = numberFormat.format(length);

  return `${startIndexFormat} - ${endIndexFormat} de ${lengthFormat}`;
};

export function getEspañolPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Items por página:';
  paginatorIntl.nextPageLabel = 'Siguiente página';
  paginatorIntl.previousPageLabel = 'Anterior página';
  paginatorIntl.firstPageLabel = 'Primera página';
  paginatorIntl.lastPageLabel = 'Ultima página';
  paginatorIntl.getRangeLabel = españolRangeLabel;

  return paginatorIntl;
}
