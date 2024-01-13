/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Pagination {
  page: number,
  pageSize: number
}

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  public pageSubject = new BehaviorSubject<number>(1);
  page$: Observable<number> = this.pageSubject.asObservable();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  handlePageEvent(event: PageEvent, pagination: Pagination) {
    pagination.pageSize = event.pageSize;
    pagination.page = event.pageIndex + 1;
    this.pageSubject.next(pagination.page);
  }

  cleanFilters(formFilters: FormGroup) {
    for (const controlName in formFilters?.controls) {
      formFilters.get(controlName)?.setValue('');
    }
  }

  setFilters(params: any) {
    Object.keys(params).forEach(key => {
      if (params[key] === null || params[key] === undefined || params[key] === '') {
        delete params[key];
      }
    });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: params
    });
  }

  cleanParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });
  }

  getPageAndPageSize(nameLocalStorage: string = '', items = 100): Pagination {
    const page = this.route.snapshot.queryParams['page'] || 1;
    const pageSize = this.route.snapshot.queryParams['pageSize'] || Number(localStorage?.getItem(nameLocalStorage)) || items;
    const pagination: Pagination = {
      page: page,
      pageSize: pageSize
    };
    return pagination
  }

  getParams() {
    const queryParamsObject: any = {};
    this.route.queryParamMap.subscribe(queryParams => {
      queryParams.keys.forEach(key => {
        queryParamsObject[key] = queryParams.get(key);
      });
    });
    return queryParamsObject;
  }
}
