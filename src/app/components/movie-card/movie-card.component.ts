import { Component, Input } from '@angular/core';
import { Movie } from '../../core/interfaces/movies-result';
import { RouterModule } from '@angular/router';
import { DatePipe, DecimalPipe, NgOptimizedImage, NgStyle } from '@angular/common';
import { getImagePath } from '../../core/utils/get-image';
import { ScoreComponent } from '../score/score.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterModule, DatePipe, DecimalPipe, NgOptimizedImage, NgStyle, ScoreComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent {

  @Input() movie!: Movie;

  getImagePath(path: string): string {
    return getImagePath(path);
  }
}
