import { Component, Input } from '@angular/core';
import { MovieDetails } from '../../core/interfaces/movie-details.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-information-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './information-list.component.html',
  styleUrl: './information-list.component.scss'
})
export class InformationListComponent {

  @Input() movie!: MovieDetails

  getStatus(status: string) {
    switch (status) {
      case 'Released':
        return 'Estrenado'
      case 'Rumored':
        return 'Pendiente'
      case 'Planned':
        return 'Planeado'
      case 'In Production':
        return 'En producción'
      case 'Post Production':
        return 'Post-producción'
      default:
        return status
    }
  }

}
