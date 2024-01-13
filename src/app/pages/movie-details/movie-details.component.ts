/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, DecimalPipe, NgStyle, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [NgStyle, DecimalPipe, DatePipe],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {
  movie: any = {};
  cast: any[] = [];
  loading: boolean = true;
  constructor(
    private _movies: MoviesService,
    private route: ActivatedRoute,
    private scroll: ViewportScroller,
  ) {

  }
  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.getMovie(id)
      this.getCast(id);
    })
  }

  getBackgroundImageStyle(path: string): string {
    return `linear-gradient(rgba(52,41,49,0.80), rgba(0,0,0,0.85)), url(https://image.tmdb.org/t/p/w1280/${path})`;
  }

  getMovie(id: any) {
    this._movies.getMovie(id).subscribe((res => {
      this.movie = res;
      this.loading = false;
    }))
  }

  getCast(id: any) {
    this._movies.getCast(id).subscribe(response => {
      this.cast = response.cast;
    });
  }

  getImagePath(path: string): string {
    if (typeof path === 'undefined' || path === null) {
      return 'assets/img/noimage.webp';
    } else {
      return 'https://image.tmdb.org/t/p/w500/' + path;
    }
  }

  getImageBack(path: string): string {
    return 'https://image.tmdb.org/t/p/w1280/' + path;
  }
}
