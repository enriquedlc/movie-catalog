import { notFound } from "next/navigation";
import { createMovieRepositoryApi } from "@/modules/movies/infrastructure/movie-repository-api";
import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";
import { MovieDetail } from "@/modules/movies/ui/components/movie-detail";

interface MoviePageProps {
  params: { id: string };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const tokenRepo = createTokenRepositoryCookies();
  const movieRepo = createMovieRepositoryApi(tokenRepo);

  const movie = await movieRepo.getById(params.id);

  if (!movie) {
    notFound();
  }

  return <MovieDetail movie={movie} />;
}
