import { NextResponse } from "next/server";
import { NotFoundError, UnauthorizedError } from "@/shared/errors/app-errors";

export function handleApiError(error: unknown): NextResponse {
  if (error instanceof NotFoundError) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  if (error instanceof UnauthorizedError) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
