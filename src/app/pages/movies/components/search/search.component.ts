import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MoviesService } from '../../../../core/services/movies.service';
import { Observable, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MoviesResult } from '../../../../core/interfaces/movies-result';
import { PaginatorService } from '../../../../core/services/paginator.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  @Output() getMovies = new EventEmitter;

  searchMovie = new FormControl('');

  moviesResult: MoviesResult | null = null;

  page!: number;

  constructor(
    private readonly moviesService: MoviesService,
    private readonly paginatorService: PaginatorService
  ) { }

  ngOnInit() {
    this.paginatorService.page$.subscribe((page) => {
      this.page = page;
    });
    this.setupSearchListener();
    this.getParams();
  }

  private getParams() {
    const params = this.paginatorService.getParams();
    if (params.search) {
      this.page = params.page
      this.searchMovie.setValue(params.search);
    }
  }

  public search(query: string | null, page: number = this.page) {
    this.moviesService.searchMovie(query, page).subscribe(
      {
        next: (result: MoviesResult) => {

          this.changeStateLoading(false)
          this.handleSearchResult(result);
        },
        error: (error) => {
          this.changeStateLoading(false)
          console.log(error);
        }
      }
    );
  }

  private setupSearchListener() {
    this.searchMovie.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => {
        this.changeStateLoading(true);
        this.getMovies.emit(null);
      }),
      debounceTime(300),
      switchMap((query: string | null) => {
        return new Observable<void>((observer) => {
          this.search(query);
          observer.next();
          observer.complete();
        });
      })
    ).subscribe();
  }

  private handleSearchResult(result: MoviesResult) {
    if (result) {
      this.moviesResult = {
        title: 'Resultado de la búsqueda',
        ...result
      };
      this.paginatorService.cleanParams();
      const params = {
        search: this.searchMovie.value,
        page: this.page
      }
      this.paginatorService.setFilters(params);
      this.getMovies.emit(this.moviesResult);
    }
  }

  changeStateLoading(newState: boolean) {
    this.moviesService.loadingSubject.next(newState);
  }
}