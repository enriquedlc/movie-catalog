import axios from "axios";
import { AuthServicePort } from "../domain/auth-service.port";

export class AuthApiService implements AuthServicePort {
  async signIn(email: string, password: string) {
    try {
      const response = await axios.post(
        "https://kata.conducerevel.com/films/auth/sign-in",
        { email, password }
      );

      const token = response.data?.token;

      return {
        success: true,
        message: "Sign in successful",
        token,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          message: error.response?.data?.message ?? "Error signing in",
        };
      }
      return {
        success: false,
        message: "Error signing in",
      };
    }
  }

  async signOut(token: string) {
    try {
      await axios.post(
        "https://kata.conducerevel.com/films/auth/sign-out",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message ?? "Error signing out");
      }
      throw new Error("Error signing out");
    }
  }
}
