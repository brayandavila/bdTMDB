/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Input, OnInit } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { DatePipe, DecimalPipe, ViewportScroller } from '@angular/common';
import { ScoreComponent } from '../../components/score/score.component';
import { MovieDetails } from '../../core/interfaces/movie-details.interface';
import { getImage } from '../../core/utils/get-image';
import { BackgroundImageComponent } from '../../components/background-image/background-image.component';
import { GenresChipsComponent } from '../../components/genres-chips/genres-chips.component';
import { countryName } from '../../core/utils/country-name';
import { ImdbButtonComponent } from '../../components/imdb-button/imdb-button.component';
import { TimeConverterComponent } from '../../components/time-converter/time-converter.component';
import { PlahecolderDetailsComponent } from '../../components/plahecolder-details/plahecolder-details.component';
import { HorizontalPeopleComponent } from '../../components/horizontal-people/horizontal-people.component';
import { InformationListComponent } from '../../components/information-list/information-list.component';
import { WatchProvidersComponent } from '../../components/watch-providers/watch-providers.component';
import { MovieCredits, Person } from '../../core/interfaces/movie-credits.interface';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
interface DepartmentGroup {
  name: string;
  people: any[];
}
@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    DecimalPipe,
    DatePipe,
    ScoreComponent,
    BackgroundImageComponent,
    GenresChipsComponent,
    ImdbButtonComponent,
    TimeConverterComponent,
    PlahecolderDetailsComponent,
    HorizontalPeopleComponent,
    InformationListComponent,
    WatchProvidersComponent,
    MatExpansionModule,
    MatIconModule
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {

  @Input() id!: number;

  movie!: MovieDetails;

  loading: boolean = true;

  year!: string | null;

  countryName!: string;

  countryNameList = countryName;

  cast!: Person[];

  totalCast!: number;

  crew!: DepartmentGroup[];

  constructor(
    private moviesService: MoviesService,
    private scroll: ViewportScroller,
  ) {

  }
  ngOnInit(): void {
    this.scroll.scrollToPosition([0, 0]);
    this.getMovie(this.id)
    this.getCast(this.id)
  }

  getMovie(id: number) {
    this.moviesService.getMovie(id).subscribe({
      next: (response: MovieDetails) => {
        this.movie = response;
        this.year = new DatePipe('en-US').transform(this.movie.release_date, 'yyyy');
        this.countryName = this.countryNameList.find(x => x.codigo === this.movie.original_language.toUpperCase())?.nombre || '';
        this.loading = false;
      }
    })
  }

  getCast(id: number) {
    this.moviesService.getCast(id).subscribe({
      next: (response: MovieCredits) => {
        this.cast = response.cast.slice(0, 9);
        this.totalCast = response.cast.length;
        this.crew = this.groupByDepartment(response.crew);
      }
    });
  }

  getImage(path: string, size: string): string {
    return getImage(path, size)
  }

  groupByDepartment(data: Person[]): DepartmentGroup[] {
    const groupedData = new Map<string, DepartmentGroup>();
    data.forEach(item => {
      const department = item.department ?? '';
      if (!groupedData.has(department)) {
        groupedData.set(department, { name: department, people: [] });
      }
      groupedData.get(department)!.people.push(item);
    });
    return Array.from(groupedData.values());
  }

}
