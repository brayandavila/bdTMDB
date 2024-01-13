/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, HostListener, ViewChild } from '@angular/core';
import { FiltersComponent } from './components/filters/filters.component';
import { LoadingOrNotDataComponent } from '../../components/loading-or-not-data/loading-or-not-data.component';
import { PlaceholderListComponent } from '../../components/placeholder-list/placeholder-list.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { Paginator } from '../../core/interfaces/paginator.interface';
import { GenresComponent } from './components/genres/genres.component';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { ExpansionPanelComponent } from '../../components/expansion-panel/expansion-panel.component';
import { SearchComponent } from './components/search/search.component';
import { Movie, MoviesResult } from '../../core/interfaces/movies-result';
import { Genre } from '../../core/interfaces/genres-movie';
import { MoviesService } from '../../core/services/movies.service';
import { PaginatorService } from '../../core/services/paginator.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    MatExpansionModule,
    FiltersComponent,
    LoadingOrNotDataComponent,
    PlaceholderListComponent,
    PaginatorComponent,
    GenresComponent,
    MovieCardComponent,
    ExpansionPanelComponent,
    SearchComponent,
    RouterModule
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  @ViewChild('searchComponent') searchComponent!: SearchComponent;

  @ViewChild('filtersComponent') filtersComponent!: FiltersComponent;

  @ViewChild('genresComponent') genresComponent!: GenresComponent;

  expandedFilters: boolean = true;

  items = Array.from({ length: 20 }, (_, i) => i + 1);

  movies!: Movie[];

  genres!: Genre[];

  loading: boolean = false;

  title: string = '';

  paginator: Paginator = {
    page: 1,
    total_results: 0,
    total_pages: 0
  }
  constructor(
    private readonly moviesService: MoviesService,
    private readonly paginatorService: PaginatorService,
  ) {
    this.onResize();
    this.moviesService.loading$.subscribe((state) => {
      this.loading = state;
    });
  }

  setMovies(moviesResult: MoviesResult) {
    if (moviesResult) {
      const { results, title } = moviesResult;

      const genreIds = results.flatMap(movie => movie.genre_ids);

      const genresMovie = this.genres.filter(genre => genreIds.some(id => genre.id === id));

      this.movies = results.map(movie => {
        const genres = genresMovie
          .filter(genre => movie.genre_ids.includes(genre.id))
          .map(genre => genre);

        return {
          ...movie,
          genres: genres,
        };
      });

      this.paginator = {
        page: moviesResult.page,
        total_results: moviesResult.total_results,
        total_pages: moviesResult.total_pages
      }

      this.title = title ?? '';
    } else {
      this.movies = [];
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const isMobile = window.innerWidth < 992;
    this.expandedFilters = !isMobile;
  }

  getMovies(event: Paginator) {
    const { search, with_genres, list } = this.paginatorService.getParams();

    if (search) this.searchComponent.search(search, event.page);
    if (with_genres) this.genresComponent.search(with_genres, event.page);
    if (list) this.filtersComponent.search(list, event.page);
  }

  getGenresList(genres: Genre[]) {
    this.genres = genres
  }
}
