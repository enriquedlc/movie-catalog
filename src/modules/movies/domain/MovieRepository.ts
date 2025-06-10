import { Movie } from "./Movie";

export interface MovieRepository {
  get(): Promise<Movie[]>;
  getById(id: string): Promise<Movie | null>;
}
