"use server";

import { createTokenRepositoryCookies } from "@/shared/token/infrastructure/token-repository-cookies";
import { SignOutUseCase } from "../application/sign-out.use-case";
import { AuthApiService } from "../infrastructure/auth-api.service";

export async function signOutAction() {
  const tokenRepository = createTokenRepositoryCookies();
  const authService = new AuthApiService();
  const signOutUseCase = new SignOutUseCase(authService, tokenRepository);

  return await signOutUseCase.execute();
}
