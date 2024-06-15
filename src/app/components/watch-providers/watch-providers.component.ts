import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { WatchProviders, WatchProvidersResponse } from '../../core/interfaces/watch-providers';
import { WatchProviderComponent } from './watch-provider/watch-provider.component';

@Component({
  selector: 'app-watch-providers',
  standalone: true,
  imports: [WatchProviderComponent],
  templateUrl: './watch-providers.component.html',
  styleUrl: './watch-providers.component.scss'
})
export class WatchProvidersComponent implements OnInit {

  @Input() id!: number;

  watchProviders!: WatchProviders;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.getWatchProviders();
  }

  getWatchProviders() {
    this.moviesService.getWatchProviders(this.id).subscribe({
      next: (response: WatchProvidersResponse) => {
        this.watchProviders = response.results['CO']
      }
    })
  }



}
