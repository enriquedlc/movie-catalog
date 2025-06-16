import { createGenreRepositoryApi } from "@/modules/movies/infrastructure/genre-repository-api";
import { createMovieRepositoryApi } from "@/modules/movies/infrastructure/movie-repository-api";
import { MoviesPageClient } from "@/modules/movies/ui/views/movies-page-client";
import { handleAppError } from "@/shared/errors/handle-app-error";
import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";

export default async function MoviesPage() {
  const tokenRepo = createTokenRepositoryCookies();
  const movieRepo = createMovieRepositoryApi(tokenRepo);
  const genreRepo = createGenreRepositoryApi(tokenRepo);

  try {
    const movies = await movieRepo.getAll();
    const genres = await genreRepo.getAll();
    return <MoviesPageClient movies={movies} genres={genres} />;
  } catch (error) {
    handleAppError(error);
  }
}
