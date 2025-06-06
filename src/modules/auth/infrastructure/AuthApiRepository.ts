import axios from "axios";
import { cookies } from "next/headers";

import { AuthRepository } from "../domain/AuthRepository";

export class AuthApiRepository implements AuthRepository {
  async signIn(email: string, password: string): Promise<string> {
    try {
      const response = await axios.post(
        "https://kata.conducerevel.com/films/auth/sign-in",
        {
          email,
          password,
        }
      );

      const token = response.data?.token;

      if (!token) throw new Error("Token not found in response");

      (await cookies()).set("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message ?? "Invalid credentials";
        throw new Error(message);
      }
      throw new Error("Unexpected error during sign in");
    }
  }
}
