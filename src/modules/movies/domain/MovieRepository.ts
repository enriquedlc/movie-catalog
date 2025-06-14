import { Movie } from "./Movie";

export interface MovieRepository {
  getAll(): Promise<Movie[]>;
  getById(id: string): Promise<Movie | null>;
  getFavorites(): Promise<Movie[]>;
}
