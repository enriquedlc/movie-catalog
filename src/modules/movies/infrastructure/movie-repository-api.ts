import axios from "axios";
import { MovieRepository } from "../domain/MovieRepository";
import { TokenRepository } from "@/shared/token/domain/TokenRepository";
import { Movie } from "../domain/Movie";

export function createMovieRepositoryApi(
  tokenRepository: TokenRepository
): MovieRepository {
  async function getAll(): Promise<Movie[]> {
    const token = await tokenRepository.get();

    if (!token) {
      throw new Error("No token available");
    }

    try {
      const response = await axios.get<Movie[]>(
        `https://kata.conducerevel.com/films/movies`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return [];
      }
      throw error;
    }
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

  async function getUserList(): Promise<Movie[]> {
    const token = await tokenRepository.get();

    if (!token) {
      throw new Error("No token available");
    }

    try {
      const response = await axios.get<Movie[]>(
        `https://kata.conducerevel.com/films/user/list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return [];
      }
      throw error;
    }
  }

  async function addToUserList(id: string): Promise<void> {
    const token = await tokenRepository.get();

    if (!token) {
      throw new Error("No token available");
    }

    try {
      await axios.post(
        `https://kata.conducerevel.com/films/user/list`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("Movie not found");
      }
      throw error;
    }
  }

  async function removeFromUserList(id: string): Promise<void> {
    const token = await tokenRepository.get();
    if (!token) {
      throw new Error("No token available");
    }

    try {
      await axios.delete(
        `https://kata.conducerevel.com/films/user/list/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("Movie not found");
      }
      throw error;
    }
  }

  return {
    getAll,
    getById,
    getUserList,
    addToUserList,
    removeFromUserList,
  };
}
