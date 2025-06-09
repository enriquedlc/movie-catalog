"use server";

import { SignInUseCase } from "../application/sign-in.use-case";
import { AuthApiService } from "../infrastructure/auth-api.service";
import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";

export async function signInAction(email: string, password: string) {
  const tokenRepository = createTokenRepositoryCookies();
  const authService = new AuthApiService();
  const signInUseCase = new SignInUseCase(authService, tokenRepository);

  return await signInUseCase.execute(email, password);
}
