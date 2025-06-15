import axios from "axios";

import { API_BASE_URL } from "@/shared/constants";
import { TokenRepository } from "@/shared/token/domain/TokenRepository";
import { Movie } from "../domain/Movie";
import { MovieRepository } from "../domain/MovieRepository";

export function createMovieRepositoryApi(
  tokenRepository: TokenRepository
): MovieRepository {
  async function getAll(): Promise<Movie[] | null> {
    const token = await tokenRepository.get();

    if (!token) {
      return null;
    }

    try {
      const response = await axios.get<Movie[]>(`${API_BASE_URL}/movies`, {
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

  async function getById(id: string): Promise<Movie | null> {
    const token = await tokenRepository.get();

    if (!token) {
      return null;
    }

    try {
      const response = await axios.get<Movie>(`${API_BASE_URL}/movies/${id}`, {
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

  async function getUserList(): Promise<Movie[] | null> {
    const token = await tokenRepository.get();

    if (!token) {
      return null;
    }

    try {
      const response = await axios.get<Movie[]>(`${API_BASE_URL}/user/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
        `${API_BASE_URL}/user/list`,
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
    if (!token) return;

    try {
      await axios.delete(`${API_BASE_URL}/user/list/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
