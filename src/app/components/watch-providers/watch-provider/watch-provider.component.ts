import { Component, Input } from '@angular/core';
import { InfoWatchProvider } from '../../../core/interfaces/watch-providers';
import { getImage } from '../../../core/utils/get-image';

@Component({
  selector: 'app-watch-provider',
  standalone: true,
  imports: [],
  templateUrl: './watch-provider.component.html',
  styleUrl: './watch-provider.component.scss'
})
export class WatchProviderComponent {

  @Input() list!: InfoWatchProvider[] | undefined;

  @Input() title!: string;

  getImage(path: string | undefined, size: string): string {
    return getImage(path, size)
  }
}
