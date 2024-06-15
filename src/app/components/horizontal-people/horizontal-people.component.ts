import { Component, Input } from '@angular/core';
import { getImage } from '../../core/utils/get-image';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Person } from '../../core/interfaces/movie-credits.interface';

@Component({
  selector: 'app-horizontal-people',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './horizontal-people.component.html',
  styleUrl: './horizontal-people.component.scss'
})
export class HorizontalPeopleComponent {

  @Input() people!: Person[];

  @Input() totalPeople!: number;

  getImage(path: string, size: string): string {
    return getImage(path, size)
  }

  showMore() {
    //this.getCast(this.id)
  }
}
