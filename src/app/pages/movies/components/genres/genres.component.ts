import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MoviesService } from '../../../../core/services/movies.service';
import { GenresMovie } from '../../../../core/interfaces/genres-movie';
import { MatChipsModule } from '@angular/material/chips';
import { EMPTY, Observable, catchError, debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MoviesResult } from '../../../../core/interfaces/movies-result';
import { PaginatorService } from '../../../../core/services/paginator.service';
import { genreColors } from '../../../../core/utils/genre-colors';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [MatChipsModule, AsyncPipe, ReactiveFormsModule],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css'
})
export class GenresComponent implements OnInit {

  @Output() getMovies = new EventEmitter;

  @Output() getGenresList = new EventEmitter;

  public genresList$!: Observable<GenresMovie>;

  public errorMessage!: string;

  filterGender = new FormControl('');

  moviesResult: MoviesResult | null = null;

  page!: number;

  genreColors = genreColors;

  constructor(
    private readonly moviesService: MoviesService,
    private readonly paginatorService: PaginatorService
  ) {
    this.getGenres();
  }

  ngOnInit() {
    this.paginatorService.page$.subscribe((page) => {
      this.page = page;
    });
    this.setupFilterGender();
    this.getParams();
  }

  private getParams() {
    const params = this.paginatorService.getParams();
    if (params.with_genres) {
      this.page = params.page
      const genresArray = params.with_genres.split(',').map(Number);

      this.filterGender.setValue(genresArray);
    }
  }

  getGenres() {
    this.genresList$ = this.moviesService.getGenres().pipe(
      catchError((error: string) => {
        this.errorMessage = error;
        return EMPTY;
      }),
      tap((genresResult: GenresMovie) => {
        const genresWithColors = genresResult.genres.map((genre) => ({
          ...genre,
          color: this.genreColors[genre.id] || '#ffffff',
        }));
        this.getGenresList.emit(genresWithColors);
      }));
  }

  public search(query: { with_genres: string | undefined; }, page: number = this.page) {
    this.moviesService.discover(query, page).subscribe(
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

  private setupFilterGender() {
    this.filterGender.valueChanges.pipe(
      distinctUntilChanged(),
      tap(() => {
        this.changeStateLoading(true);
        this.getMovies.emit(null);
      }),
      debounceTime(300),
      switchMap((query: string | null) => {
        const params = {
          with_genres: query?.toString()
        }
        return new Observable<void>((observer) => {
          this.search(params);
          observer.next();
          observer.complete();
        });
      })
    ).subscribe();
  }

  private handleSearchResult(result: MoviesResult) {
    if (result) {
      this.moviesResult = {
        title: 'Géneros',
        ...result
      };
      this.paginatorService.cleanParams();
      const params = {
        with_genres: this.filterGender.value?.toString(),
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
