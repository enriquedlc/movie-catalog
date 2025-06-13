import { Genre } from "./Genre";

export interface GenreRepository {
  getAll(): Promise<Genre[]>;
  getById(id: string): Promise<Genre | null>;
}
