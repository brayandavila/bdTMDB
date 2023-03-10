export interface PopularList {
  page: BigInteger;
  results: Result[];
  total_pages: BigInteger;
  total_results: BigInteger;
}

export interface Result {
  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
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
