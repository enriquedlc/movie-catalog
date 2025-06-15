import { notFound } from "next/navigation";
import { createGenreRepositoryApi } from "@/modules/movies/infrastructure/genre-repository-api";
import { createMovieRepositoryApi } from "@/modules/movies/infrastructure/movie-repository-api";
import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";
import MoviesPageClient from "../../modules/movies/ui/views/movies-page-client";

export default async function MoviesPage() {
  const tokenRepository = createTokenRepositoryCookies();
  const genreRepository = createGenreRepositoryApi(tokenRepository);
  const movieRepository = createMovieRepositoryApi(tokenRepository);

  const [genres, movies] = await Promise.all([
    genreRepository.getAll(),
    movieRepository.getAll(),
  ]);

  if (!genres || !movies) return notFound();

  return (
    <>
      <MoviesPageClient genres={genres} movies={movies} />
    </>
  );
}
