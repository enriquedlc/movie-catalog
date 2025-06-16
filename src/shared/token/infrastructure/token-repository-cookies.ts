import { cookies } from "next/headers";

import { UnauthorizedError } from "@/shared/errors/app-errors";
import { TokenRepository } from "../domain/TokenRepository";

const JWT_COOKIE_NAME = "jwt";

export function createTokenRepositoryCookies(): TokenRepository {
  async function get(): Promise<string> {
    const cookieStore = await cookies();
    const token = cookieStore.get(JWT_COOKIE_NAME)?.value;

    if (!token) {
      throw new UnauthorizedError("No token found in cookies");
    }

    return token;
  }

  async function set(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(JWT_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  async function remove(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(JWT_COOKIE_NAME);
  }

  return { get, set, remove };
}
