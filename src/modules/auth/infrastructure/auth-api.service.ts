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
}
