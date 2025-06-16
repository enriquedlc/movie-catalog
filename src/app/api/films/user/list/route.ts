import { NextRequest, NextResponse } from "next/server";

import { createMovieRepositoryApi } from "@/modules/movies/infrastructure/movie-repository-api";
import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";
import { handleApiError } from "@/shared/utils/handle-api-error";

export async function POST(req: NextRequest) {
  const tokenRepo = createTokenRepositoryCookies();
  const movieRepo = createMovieRepositoryApi(tokenRepo);

  const body = await req.json();
  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "Missing movie id" }, { status: 400 });
  }

  try {
    await movieRepo.addToUserList(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    handleApiError(error);
  }
}

export async function GET() {
  const tokenRepo = createTokenRepositoryCookies();
  const movieRepo = createMovieRepositoryApi(tokenRepo);

  try {
    const userList = await movieRepo.getUserList();
    return NextResponse.json(userList);
  } catch (error) {
    return handleApiError(error);
  }
}
