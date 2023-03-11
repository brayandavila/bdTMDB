import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MoviesList } from '../interfaces/movies-list';
import { environment } from 'src/environments/environment.development';
import { GenresMovie } from '../interfaces/genres-movie';
import { MovieDetails } from '../interfaces/movie-details.interface';
import { MovieCredits } from '../interfaces/movie-credits.interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  popularURL = `${environment.apiURL}movie/popular${environment.apiKey}${environment.lenguaje}`;
  search = `${environment.apiURL}search/movie${environment.apiKey}${environment.lenguaje}`;
  constructor(private http: HttpClient) { }

  public getMovies(section: string, page: number) {
    return this.http.get<MoviesList>(`${environment.apiURL}movie/${section}${environment.apiKey}${environment.lenguaje}&page=${page}`)
  }

  public searchMovie(query: string, page: number) {
    return this.http.get<MoviesList>(this.search + '&page=' + page + '&query=' + query)
  }

  public getGenres() {
    return this.http.get<GenresMovie>(environment.apiURL + 'genre/movie/list' + environment.apiKey + environment.lenguaje)
  }

  public discover(params: any, page: number) {
    return this.http.get<MoviesList>(environment.apiURL + 'discover/movie' + environment.apiKey + environment.lenguaje + '&page=' + page, { params })
  }

  public getMovie(id: number) {
    return this.http.get<MovieDetails>(`${environment.apiURL}movie/${id}${environment.apiKey}${environment.lenguaje}`)
  }

  public getCast(id: number) {
    return this.http.get<MovieCredits>(`${environment.apiURL}movie/${id}/credits${environment.apiKey}${environment.lenguaje}`)
  }
}
