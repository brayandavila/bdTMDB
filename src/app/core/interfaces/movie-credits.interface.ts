export interface MovieCredits {
  id: BigInteger;
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  adult: boolean;
  gender: BigInteger;
  id: BigInteger;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: BigInteger;
  character: string;
  credit_id: string;
  order: BigInteger;
}

export interface Crew {
  adult: boolean;
  gender: BigInteger;
  id: BigInteger;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}
