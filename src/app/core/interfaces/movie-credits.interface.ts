export interface MovieCredits {
  id: BigInteger;
  cast: Person[];
  crew: Person[];
}

export interface Person {
  adult: boolean;
  gender: BigInteger;
  id: BigInteger;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id?: BigInteger;
  character: string;
  department?: string;
  job?: string;
  credit_id: string;
  order: BigInteger;
}

