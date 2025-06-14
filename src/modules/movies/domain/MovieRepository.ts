import { Movie } from "./Movie";

export interface MovieRepository {
  getAll(): Promise<Movie[]>;
  getById(id: string): Promise<Movie | null>;
  getUserList(): Promise<Movie[]>;
  addToUserList(id: string): Promise<void>;
  removeFromUserList(id: string): Promise<void>;
}
