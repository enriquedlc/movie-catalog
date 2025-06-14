import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";
import { createGenreRepositoryApi } from "@/modules/movies/infrastructure/genre-repository-api";
import { createMovieRepositoryApi } from "@/modules/movies/infrastructure/movie-repository-api";
import MoviesPageClient from "./movies-page-client";

export default async function MoviesPage() {
  const tokenRepository = createTokenRepositoryCookies();
  const genreRepository = createGenreRepositoryApi(tokenRepository);
  const movieRepository = createMovieRepositoryApi(tokenRepository);

  const [genres, movies] = await Promise.all([
    genreRepository.getAll(),
    movieRepository.getAll(),
  ]);

  console.log({ movies });

  // TODO: refactor
  const movie = movies.find((m) => m.title.includes("monster, INC."));

  return (
    <MoviesPageClient
      genres={genres}
      movies={movies}
      heroMovie={movie ?? movies[0]}
    />
  );
}
