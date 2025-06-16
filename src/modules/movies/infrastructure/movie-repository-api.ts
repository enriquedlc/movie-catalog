import axios from "axios";

import { API_BASE_URL } from "@/shared/constants";
import { UnauthorizedError } from "@/shared/errors/app-errors";
import { TokenRepository } from "@/shared/token/domain/TokenRepository";
import { handleAppError } from "@/shared/utils/handle-app-error";
import { Movie } from "../domain/Movie";
import { MovieRepository } from "../domain/MovieRepository";

export function createMovieRepositoryApi(
  tokenRepository: TokenRepository
): MovieRepository {
  async function authHeader(): Promise<{ Authorization: string }> {
    const token = await tokenRepository.get();
    if (!token) throw new UnauthorizedError();
    return { Authorization: `Bearer ${token}` };
  }

  async function getAll(): Promise<Movie[]> {
    try {
      const headers = await authHeader();
      const response = await axios.get<Movie[]>(`${API_BASE_URL}/movies`, {
        headers,
      });
      return response.data;
    } catch (error) {
      handleAppError(error);
    }
  }

  async function getById(id: string): Promise<Movie> {
    try {
      const headers = await authHeader();
      const response = await axios.get<Movie>(`${API_BASE_URL}/movies/${id}`, {
        headers,
      });
      return response.data;
    } catch (error) {
      handleAppError(error);
    }
  }

  async function getUserList(): Promise<string[]> {
    try {
      const headers = await authHeader();
      const response = await axios.get<string[]>(`${API_BASE_URL}/user/list`, {
        headers,
      });
      return response.data;
    } catch (error) {
      handleAppError(error);
    }
  }

  async function addToUserList(id: string): Promise<void> {
    try {
      const headers = await authHeader();
      await axios.post(`${API_BASE_URL}/user/list`, { id }, { headers });
    } catch (error) {
      handleAppError(error);
    }
  }

  async function removeFromUserList(id: string): Promise<void> {
    try {
      const headers = await authHeader();
      await axios.delete(`${API_BASE_URL}/user/list/${id}`, { headers });
    } catch (error) {
      handleAppError(error);
    }
  }

  async function getByGenre(genreId: string): Promise<Movie[]> {
    try {
      const headers = await authHeader();
      const response = await axios.get<Movie[]>(
        `${API_BASE_URL}/genres/${genreId}/movies`,
        {
          headers,
        }
      );
      return response.data;
    } catch (error) {
      handleAppError(error);
    }
  }

  return {
    getAll,
    getById,
    getUserList,
    addToUserList,
    removeFromUserList,
    getByGenre,
  };
}
