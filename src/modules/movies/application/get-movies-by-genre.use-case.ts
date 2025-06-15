import { Movie } from "../domain/Movie";
import { MovieRepository } from "../domain/MovieRepository";

export class GetMoviesByGenreUseCase {
  constructor(private readonly movieRepo: MovieRepository) {}

  async execute(genreId: string): Promise<Movie[]> {
    return this.movieRepo.getByGenre(genreId);
  }
}
