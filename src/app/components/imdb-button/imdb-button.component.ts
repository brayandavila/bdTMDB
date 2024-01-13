import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-imdb-button',
  standalone: true,
  imports: [],
  templateUrl: './imdb-button.component.html',
  styleUrl: './imdb-button.component.scss'
})
export class ImdbButtonComponent {
  @Input() imdbUrl!: string;
}
