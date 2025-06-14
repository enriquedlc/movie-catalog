import { notFound } from "next/navigation";
import { createMovieRepositoryApi } from "@/modules/movies/infrastructure/movie-repository-api";
import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";
import { MovieDetail } from "@/modules/movies/ui/components/movie-detail";
import { createGenreRepositoryApi } from "@/modules/movies/infrastructure/genre-repository-api";
import { Movie } from "@/modules/movies/domain/Movie";

interface MoviePageProps {
  params: { id: string };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const tokenRepo = createTokenRepositoryCookies();
  const movieRepo = createMovieRepositoryApi(tokenRepo);
  const genreRepo = createGenreRepositoryApi(tokenRepo);

  const movie = await movieRepo.getById(params.id);

  if (!movie) {
    notFound();
  }

  const genre = await genreRepo.getById(movie.genre);

  if (!genre) {
    notFound();
  }

  const movieWithGenre: Movie = {
    ...movie,
    genre: genre.name,
  };

  return <MovieDetail movie={movieWithGenre} />;
}
