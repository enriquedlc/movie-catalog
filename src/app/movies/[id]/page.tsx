import { createMovieRepositoryApi } from "@/modules/movies/infrastructure/movie-repository-api";
import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";
import { createGenreRepositoryApi } from "@/modules/movies/infrastructure/genre-repository-api";
import { MovieDetail } from "@/modules/movies/ui/components/movie-detail";
import { handleAppError } from "@/shared/errors/handle-app-error";

interface MoviePageProps {
  params: { id: string };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const tokenRepo = createTokenRepositoryCookies();
  const movieRepo = createMovieRepositoryApi(tokenRepo);
  const genreRepo = createGenreRepositoryApi(tokenRepo);

  try {
    const movie = await movieRepo.getById(params.id);
    const genre = await genreRepo.getById(movie.genre);

    const movieWithGenre = { ...movie, genre: genre.name };

    return <MovieDetail movie={movieWithGenre} />;
  } catch (error) {
    handleAppError(error);
  }
}
