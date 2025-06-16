import { createMovieRepositoryApi } from "@/modules/movies/infrastructure/movie-repository-api";
import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";
import { createGenreRepositoryApi } from "@/modules/movies/infrastructure/genre-repository-api";
import { MovieDetail } from "@/modules/movies/ui/components/movie-detail";
import { handleAppError } from "@/shared/errors/handle-app-error";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage(props: MoviePageProps) {
  const params = await props.params;
  const tokenRepo = createTokenRepositoryCookies();
  const movieRepo = createMovieRepositoryApi(tokenRepo);
  const genreRepo = createGenreRepositoryApi(tokenRepo);

  try {
    const movie = await movieRepo.getById(params.id);
    const genre = await genreRepo.getById(movie.genre);
    const isInUserList = await movieRepo
      .getUserList()
      .then((list) => list.includes(movie.id));

    const movieWithGenre = { ...movie, genre: genre.name };

    return <MovieDetail movie={movieWithGenre} isInUserList={isInUserList} />;
  } catch (error) {
    handleAppError(error);
  }
}
