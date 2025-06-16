import axios from "axios";

import { NotFoundError, UnauthorizedError } from "@/shared/errors/app-errors";

export function handleAppError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    if (status === 401) throw new UnauthorizedError();
    if (status === 404) throw new NotFoundError();
  }
  throw error;
}
