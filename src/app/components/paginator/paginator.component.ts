/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginatorService } from '../../core/services/paginator.service';
import { Paginator } from '../../core/interfaces/paginator.interface';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent {
  @Input() pagination: { page: number, pageSize: number } = {
    page: 1,
    pageSize: 20,
  };

  @Input() paginationMat!: Paginator;

  @Output() changePaginate: EventEmitter<any> = new EventEmitter();

  @Input() localStorageName: string = '';


  constructor(private readonly paginatorService: PaginatorService) { }

  handlePageEvent(event: PageEvent) {
    this.paginatorService.handlePageEvent(event, this.pagination);
    localStorage?.setItem(this.localStorageName, this.pagination?.pageSize.toString());
    this.changePaginate.emit(this.pagination)
  }
}
