import { Movie } from "./Movie";

export interface MovieRepository {
  getAll(): Promise<Movie[] | null>;
  getById(id: string): Promise<Movie | null>;
  getUserList(): Promise<Movie[] | null>;
  addToUserList(id: string): Promise<void>;
  removeFromUserList(id: string): Promise<void>;
}
