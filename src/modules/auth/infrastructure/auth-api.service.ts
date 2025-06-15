import axios from "axios";

import { AuthServicePort } from "../domain/auth-service.port";
import { API_BASE_URL } from "@/shared/constants";
import { UnauthorizedError } from "@/shared/errors/app-errors";

export class AuthApiService implements AuthServicePort {
  async signIn(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    message: string;
    token?: string;
  }> {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/sign-in`, {
        email,
        password,
      });

      const token = response.data?.token;

      return {
        success: true,
        message: "Sign in successful",
        token,
      };
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message ?? "Error signing in"
        : "Error signing in";

      return {
        success: false,
        message,
      };
    }
  }

  async signOut(token: string): Promise<void> {
    try {
      await axios.post(
        `${API_BASE_URL}/auth/sign-out`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new UnauthorizedError();
      }

      throw new Error("Error signing out");
    }
  }
}
