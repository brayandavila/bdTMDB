import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Genre } from '../../core/interfaces/genres-movie';
import { NgStyle } from '@angular/common';
import { genreColors } from '../../core/utils/genre-colors';

@Component({
  selector: 'app-genres-chips',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './genres-chips.component.html',
  styleUrl: './genres-chips.component.scss'
})
export class GenresChipsComponent implements OnChanges {

  @Input() genres!: Genre[] | undefined;

  @HostBinding('class') classes = 'd-flex flex-wrap gap-2';

  genreColors = genreColors;

  genresWithColors!: Genre[] | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['genres']) {
      this.setGenres();
    }

  }

  setGenres() {
    this.genresWithColors = this.genres?.map((genre) => ({
      ...genre,
      color: this.genreColors[genre.id] || '#ffffff',
    }));
  }
}
