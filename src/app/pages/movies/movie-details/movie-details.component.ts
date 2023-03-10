import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from 'src/app/core/services/movies.service';
import { getImagePath } from 'src/app/core/utils/get-image';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: any = {};
  cast: any[] = [];

  constructor(
    private _movies: MoviesService,
    private route: ActivatedRoute,
    private scroll: ViewportScroller,
  ) {

  }
  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
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
    }))
  }

  getCast(id: any) {
    this._movies.getCast(id).subscribe(response => {
      this.cast = response.cast;
    });
  }

  getImagePath(path: string): string {
    if (typeof path === 'undefined' || path === null) {
      return 'assets/img/noimage.png';
    } else {
      return 'https://image.tmdb.org/t/p/w500/' + path;
    }
  }

  getImageBack(path: string): string {
    return 'https://image.tmdb.org/t/p/w1280/' + path;
  }
}
