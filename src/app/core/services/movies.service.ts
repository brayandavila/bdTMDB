import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopularList } from '../interfaces/popular-list';
import { environment } from 'src/environments/environment.development';
import { GenresMovie } from '../interfaces/genres-movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  popularURL = `${environment.apiURL}movie/popular${environment.apiKey}${environment.lenguaje}`;
  search = `${environment.apiURL}search/movie${environment.apiKey}${environment.lenguaje}`;
  constructor(private http: HttpClient) { }

  public getMovies(section: string, page: number) {
    return this.http.get<PopularList>(`${environment.apiURL}movie/${section}${environment.apiKey}${environment.lenguaje}&page=${page}`)
  }

  public searchMovie(query: string, page: number) {
    return this.http.get<PopularList>(this.search + '&page=' + page + '&query=' + query)
  }

  public getGenres() {
    return this.http.get<GenresMovie>(environment.apiURL + 'genre/movie/list' + environment.apiKey + environment.lenguaje)
  }

  public discover(params: any) {
    return this.http.get<PopularList>(environment.apiURL + 'discover/movie' + environment.apiKey + environment.lenguaje, { params })
  }
}
