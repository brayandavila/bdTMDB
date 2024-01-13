import { Genre } from "./genres-movie";

export interface MoviesResult {
  title?: string,
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  genres?: Genre[];
  id: BigInteger;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: BigInteger;
  video: boolean;
  vote_average: number;
}
