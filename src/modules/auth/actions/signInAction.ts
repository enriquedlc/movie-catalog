"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function signInAction(email: string, password: string) {
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

    return { success: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || "Invalid credentials";
      return { success: false, message };
    }
    return { success: false, message: "Invalid credentials" };
  }
}
