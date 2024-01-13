/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GenresMovie } from '../interfaces/genres-movie';
import { MovieCredits } from '../interfaces/movie-credits.interface';
import { MovieDetails } from '../interfaces/movie-details.interface';
import { MoviesResult } from '../interfaces/movies-result';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  public loadingSubject = new BehaviorSubject<boolean>(true);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  private popularURL = `${environment.apiURL}movie/popular${environment.apiKey}${environment.lenguaje}`;
  private searchURL = `${environment.apiURL}search/movie${environment.apiKey}${environment.lenguaje}`;

  constructor(private http: HttpClient) { }

  getMovies(section: string | null, page: number = 1): Observable<MoviesResult> {
    const url = `${environment.apiURL}movie/${section}${environment.apiKey}${environment.lenguaje}&page=${page}`;
    return this.http.get<MoviesResult>(url);
  }

  searchMovie(query: string | null, page: number = 1): Observable<MoviesResult> {
    const url = query
      ? `${this.searchURL}&page=${page}&query=${query}`
      : `${this.popularURL}&page=${page}`;
    return this.http.get<MoviesResult>(url);
  }

  getGenres(): Observable<GenresMovie> {
    const url = `${environment.apiURL}genre/movie/list${environment.apiKey}${environment.lenguaje}`;
    return this.http.get<GenresMovie>(url);
  }

  discover(params: any, page: number = 1): Observable<MoviesResult> {
    const url = `${environment.apiURL}discover/movie${environment.apiKey}${environment.lenguaje}&page=${page}`;
    return this.http.get<MoviesResult>(url, { params: new HttpParams({ fromObject: params }) });
  }

  getMovie(id: number): Observable<MovieDetails> {
    const url = `${environment.apiURL}movie/${id}${environment.apiKey}${environment.lenguaje}`;
    return this.http.get<MovieDetails>(url);
  }

  getCast(id: number): Observable<MovieCredits> {
    const url = `${environment.apiURL}movie/${id}/credits${environment.apiKey}${environment.lenguaje}`;
    return this.http.get<MovieCredits>(url);
  }
}
