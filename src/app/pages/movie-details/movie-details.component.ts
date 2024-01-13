/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { DatePipe, DecimalPipe, ViewportScroller } from '@angular/common';
import { ScoreComponent } from '../../components/score/score.component';
import { Cast, MovieCredits } from '../../core/interfaces/movie-credits.interface';
import { MovieDetails } from '../../core/interfaces/movie-details.interface';
import { getImage } from '../../core/utils/get-image';
import { BackgroundImageComponent } from '../../components/background-image/background-image.component';
import { GenresChipsComponent } from '../../components/genres-chips/genres-chips.component';
import { countryName } from '../../core/utils/country-name';
import { ImdbButtonComponent } from '../../components/imdb-button/imdb-button.component';
import { TimeConverterComponent } from '../../components/time-converter/time-converter.component';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    DecimalPipe,
    DatePipe,
    ScoreComponent,
    BackgroundImageComponent,
    GenresChipsComponent,
    ImdbButtonComponent,
    TimeConverterComponent
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {

  @Input() id!: number;

  movie!: MovieDetails;

  cast!: Cast[];

  loading: boolean = true;

  year!: string | null;

  countryName!: string;

  countryNameList = countryName;

  constructor(
    private moviesService: MoviesService,
    private scroll: ViewportScroller,
  ) {

  }
  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
    this.getMovie(this.id)
    this.getCast(this.id);
  }

  getMovie(id: number) {
    this.moviesService.getMovie(id).subscribe({
      next: (response: MovieDetails) => {
        this.movie = response;
        this.year = new DatePipe('en-US').transform(this.movie.release_date, 'yyyy');
        this.countryName = this.countryNameList.find(x => x.codigo === this.movie.original_language.toUpperCase())?.nombre || '';
        this.loading = false
      }
    })
  }

  getCast(id: any) {
    this.moviesService.getCast(id).subscribe({
      next: (response: MovieCredits) => {
        this.cast = response.cast;
      }
    });
  }

  getImage(path: string, size: string): string {
    return getImage(path, size)
  }

}
