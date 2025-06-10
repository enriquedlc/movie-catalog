import axios from "axios";
import { MovieRepository } from "../domain/MovieRepository";
import { TokenRepository } from "@/shared/token/domain/TokenRepository";
import { Movie } from "../domain/Movie";

export function createMovieRepositoryApi(
  tokenRepository: TokenRepository
): MovieRepository {
  async function get(): Promise<Movie[]> {
    const token = await tokenRepository.get();

    if (!token) {
      throw new Error("No token available");
    }

    const response = await axios.get<Movie[]>(
      `https://kata.conducerevel.com/films/movies`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  }

  async function getById(id: string): Promise<Movie | null> {
    const token = await tokenRepository.get();

    if (!token) {
      throw new Error("No token available");
    }

    try {
      const response = await axios.get<Movie>(
        `https://kata.conducerevel.com/films/movies/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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
    get,
    getById,
  };
}
