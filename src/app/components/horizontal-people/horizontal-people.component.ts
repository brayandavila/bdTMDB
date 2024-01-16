import { Component, Input, OnInit } from '@angular/core';
import { Cast, MovieCredits } from '../../core/interfaces/movie-credits.interface';
import { MoviesService } from '../../core/services/movies.service';
import { getImage } from '../../core/utils/get-image';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-horizontal-people',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './horizontal-people.component.html',
  styleUrl: './horizontal-people.component.scss'
})
export class HorizontalPeopleComponent implements OnInit {

  @Input() id!: number;

  cast!: Cast[];

  totalPeople!: number;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getCast(this.id)
  }

  getCast(id: number) {
    this.moviesService.getCast(id).subscribe({
      next: (response: MovieCredits) => {
        this.cast = response.cast.slice(0, 9);
        this.totalPeople = response.cast.length;
      }
    });
  }

  getImage(path: string, size: string): string {
    return getImage(path, size)
  }

  showMore() {
    this.getCast(this.id)
  }
}
