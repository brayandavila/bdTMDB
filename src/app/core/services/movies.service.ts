/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GenresMovie } from '../interfaces/genres-movie';
import { MovieCredits } from '../interfaces/movie-credits.interface';
import { MovieDetails } from '../interfaces/movie-details.interface';
import { MoviesResult } from '../interfaces/movies-result';
import { BehaviorSubject, Observable } from 'rxjs';
import { WatchProvidersResponse } from '../interfaces/watch-providers';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  public loadingSubject = new BehaviorSubject<boolean>(true);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  private keyLanguage = `${environment.apiKey}${environment.lenguaje}`

  private popularURL = `${environment.apiURL}movie/popular${this.keyLanguage}`;
  private searchURL = `${environment.apiURL}search/movie${this.keyLanguage}`;

  constructor(private http: HttpClient) { }

  getMovies(section: string | null, page: number = 1): Observable<MoviesResult> {
    const url = `${environment.apiURL}movie/${section}${this.keyLanguage}&page=${page}`;
    return this.http.get<MoviesResult>(url);
  }

  searchMovie(query: string | null, page: number = 1): Observable<MoviesResult> {
    const url = query
      ? `${this.searchURL}&page=${page}&query=${query}`
      : `${this.popularURL}&page=${page}`;
    return this.http.get<MoviesResult>(url);
  }

  getGenres(): Observable<GenresMovie> {
    const url = `${environment.apiURL}genre/movie/list${this.keyLanguage}`;
    return this.http.get<GenresMovie>(url);
  }

  discover(params: any, page: number = 1): Observable<MoviesResult> {
    const url = `${environment.apiURL}discover/movie${this.keyLanguage}&page=${page}`;
    return this.http.get<MoviesResult>(url, { params: new HttpParams({ fromObject: params }) });
  }

  getMovie(id: number): Observable<MovieDetails> {
    const url = `${environment.apiURL}movie/${id}${this.keyLanguage}`;
    return this.http.get<MovieDetails>(url);
  }

  getCast(id: number): Observable<MovieCredits> {
    const url = `${environment.apiURL}movie/${id}/credits${this.keyLanguage}`;
    return this.http.get<MovieCredits>(url);
  }

  getWatchProviders(id: number): Observable<WatchProvidersResponse> {
    const url = `${environment.apiURL}movie/${id}/watch/providers${this.keyLanguage}`;
    return this.http.get<WatchProvidersResponse>(url);
  }
}
