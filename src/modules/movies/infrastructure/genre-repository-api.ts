import axios from "axios";

import { API_BASE_URL } from "@/shared/constants";
import { UnauthorizedError } from "@/shared/errors/app-errors";
import { TokenRepository } from "@/shared/token/domain/TokenRepository";
import { handleError } from "@/shared/utils/handle-error";
import { Genre } from "../domain/Genre";
import { GenreRepository } from "../domain/GenreRepository";

export function createGenreRepositoryApi(
  tokenRepo: TokenRepository
): GenreRepository {
  async function authHeader(): Promise<{ Authorization: string }> {
    const token = await tokenRepo.get();
    if (!token) throw new UnauthorizedError();
    return { Authorization: `Bearer ${token}` };
  }

  async function getAll(): Promise<Genre[]> {
    try {
      const headers = await authHeader();
      const response = await axios.get<Genre[]>(`${API_BASE_URL}/genres`, {
        headers,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function getById(id: string): Promise<Genre> {
    try {
      const headers = await authHeader();
      const response = await axios.get<Genre>(`${API_BASE_URL}/genres/${id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  return {
    getAll,
    getById,
  };
}
