"use server";

import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";
import { GetMoviesByGenreUseCase } from "../application/get-movies-by-genre.use-case";
import { createMovieRepositoryApi } from "../infrastructure/movie-repository-api";

export async function getMoviesByGenre(genreId: string) {
  const tokenRepo = createTokenRepositoryCookies();
  const movieRepo = createMovieRepositoryApi(tokenRepo);
  const useCase = new GetMoviesByGenreUseCase(movieRepo);

  return await useCase.execute(genreId);
}
