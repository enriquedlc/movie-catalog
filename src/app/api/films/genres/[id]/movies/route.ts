import { NextRequest, NextResponse } from "next/server";

import { getMoviesByGenre } from "@/modules/movies/entrypoints/get-movies-by-genre";
import { handleApiError } from "@/shared/utils/handle-api-error";

export async function GET(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    const movies = await getMoviesByGenre(id);
    return NextResponse.json(movies);
  } catch (error) {
    return handleApiError(error);
  }
}
