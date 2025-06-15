import { NextRequest, NextResponse } from "next/server";

import { createMovieRepositoryApi } from "@/modules/movies/infrastructure/movie-repository-api";
import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const id = (await context.params).id;

  const tokenRepository = createTokenRepositoryCookies();
  const movieRepository = createMovieRepositoryApi(tokenRepository);

  const response = await movieRepository.getByGenre(id);

  if (!response) {
    return NextResponse.json(
      { error: "No movies found for this genre" },
      { status: 404 }
    );
  }

  return NextResponse.json(response);
}
