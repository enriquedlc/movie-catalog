import { GenreRepository } from "../domain/GenreRepository";
import { Genre } from "../domain/Genre";
import { TokenRepository } from "@/shared/token/domain/TokenRepository";
import axios from "axios";

export function createGenreRepositoryApi(
  tokenRepo: TokenRepository
): GenreRepository {
  async function getAll(): Promise<Genre[]> {
    const token = await tokenRepo.get();

    if (!token) {
      throw new Error("No token available");
    }

    const response = await axios.get<Genre[]>(
      `https://kata.conducerevel.com/films/genres`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
      const response = await axios.get<Genre>(
        `https://kata.conducerevel.com/films/genres/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
