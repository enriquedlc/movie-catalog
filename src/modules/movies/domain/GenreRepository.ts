import { Genre } from "./Genre";

export interface GenreRepository {
  getAll(): Promise<Genre[] | null>;
  getById(id: string): Promise<Genre | null>;
}
