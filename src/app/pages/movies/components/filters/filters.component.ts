import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MoviesResult } from '../../../../core/interfaces/movies-result';
import { MoviesService } from '../../../../core/services/movies.service';
import { PaginatorService } from '../../../../core/services/paginator.service';
import { Observable, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MatRadioModule, ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit {

  filters = [
    {
      name: 'Popular',
      value: 'popular'
    },
    {
      name: 'En cartelera hoy',
      value: 'now_playing'
    },
    {
      name: 'Proximos estrenos',
      value: 'upcoming'
    },
    {
      name: 'Mejor valoradas',
      value: 'top_rated'
    }
  ]

  @Output() getMovies = new EventEmitter;

  movieListFilter = new FormControl('');

  moviesResult: MoviesResult | null = null;

  page!: number;

  constructor(
    private moviesService: MoviesService,
    private readonly paginatorService: PaginatorService
  ) { }

  ngOnInit() {
    this.paginatorService.page$.subscribe((page) => {
      this.page = page;
    })
    this.setupSearchListener();
    this.getParams();
  }

  private getParams() {
    const params = this.paginatorService.getParams();
    const { list } = params;

    if (!Object.keys(params).length) {
      this.movieListFilter.setValue('popular');
    } else if (list) {
      this.page = params.page
      this.movieListFilter.setValue(list);
    }
  }

  public search(query: string | null, page: number = this.page) {
    this.moviesService.getMovies(query, page).subscribe(
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
    this.movieListFilter.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => {
        this.changeStateLoading(true);
        this.getMovies.emit(null);
      }),
      debounceTime(300),
      switchMap(query => {
        return new Observable<void>((observer) => {
          this.search(query);
          observer.next();
          observer.complete();
        });
      })
    ).subscribe()
  }

  private handleSearchResult(result: MoviesResult) {
    if (result) {
      const selectedFilter = this.filters.find(x => x.value === this.movieListFilter.value)
      if (selectedFilter) {
        result.title = selectedFilter.name
      }
      this.moviesResult = {
        title: 'Peliculas',
        ...result
      };
      this.paginatorService.cleanParams();
      const params = {
        list: this.movieListFilter.value,
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
