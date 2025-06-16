import { NextRequest, NextResponse } from "next/server";

import { createMovieRepositoryApi } from "@/modules/movies/infrastructure/movie-repository-api";
import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";
import { handleApiError } from "@/shared/utils/handle-api-error";

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const tokenRepo = createTokenRepositoryCookies();
  const movieRepo = createMovieRepositoryApi(tokenRepo);

  const movieId = (await context.params).id;

  if (!movieId) {
    return NextResponse.json({ error: "Missing movie id" }, { status: 400 });
  }

  try {
    await movieRepo.removeFromUserList(movieId);
    return NextResponse.json({ success: true });
  } catch (error) {
    handleApiError(error);
  }
}
