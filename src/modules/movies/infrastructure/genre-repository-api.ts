import axios from "axios";

import { TokenRepository } from "@/shared/token/domain/TokenRepository";
import { Genre } from "../domain/Genre";
import { GenreRepository } from "../domain/GenreRepository";
import { API_BASE_URL } from "@/shared/constants";

export function createGenreRepositoryApi(
  tokenRepo: TokenRepository
): GenreRepository {
  async function getAll(): Promise<Genre[] | null> {
    const token = await tokenRepo.get();

    if (!token) {
      return null;
    }

    const response = await axios.get<Genre[]>(`${API_BASE_URL}/genres`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data) {
      throw new Error("Failed to fetch genres");
    }

    return response.data;
  }

  async function getById(id: string): Promise<Genre | null> {
    const token = await tokenRepo.get();
    if (!token) {
      throw new Error("No token available");
    }

    try {
      const response = await axios.get<Genre>(`${API_BASE_URL}/genres/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw error;
    }
  }

  return {
    getAll,
    getById,
  };
}
