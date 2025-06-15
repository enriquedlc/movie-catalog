import { notFound, redirect } from "next/navigation";

import { NotFoundError, UnauthorizedError } from "./app-errors";

export function handleAppError(error: unknown): never {
  if (error instanceof UnauthorizedError) {
    redirect("/login");
  }

  if (error instanceof NotFoundError) {
    notFound();
  }

  throw error;
}
