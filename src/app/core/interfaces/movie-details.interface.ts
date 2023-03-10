export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Object;
  budget: BigInteger;
  genres: Genres[];
  homepage: string;
  id: BigInteger;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanies[];
  production_countries: ProductionCountries[];
  release_date: Date;
  revenue: BigInteger;
  runtime: BigInteger;
  spoken_languages: SpokenLanguages;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: BigInteger;
}

export interface Genres {
  id: BigInteger;
  name: string;
}

export interface ProductionCompanies {
  name: string;
  id: BigInteger;
  logo_path: string;
  origin_country: string;
}

export interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguages {
  iso_639_1: string;
  name: string;
}
