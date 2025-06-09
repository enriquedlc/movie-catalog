"use server";

import { cookies } from "next/headers";
import { AuthApiService } from "../infrastructure/auth-api.service";
import { SignInUseCase } from "../application/sign-in.use-case";

export async function signInAction(email: string, password: string) {
  const authService = new AuthApiService();
  const signInUseCase = new SignInUseCase(authService);

  const result = await signInUseCase.execute(email, password);

  if (result.success && result.token) {
    (await cookies()).set("jwt", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  return {
    success: result.success,
    message: result.message,
  };
}
