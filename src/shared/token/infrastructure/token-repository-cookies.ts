import { cookies } from "next/headers";

import { TokenRepository } from "../domain/TokenRepository";

const JWT_COOKIE_NAME = "jwt";

export function createTokenRepositoryCookies(): TokenRepository {
  async function get(): Promise<string | null> {
    const cookieStore = cookies();
    const token = (await cookieStore).get(JWT_COOKIE_NAME);
    return token?.value ?? null;
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

  return {
    get,
    set,
  };
}
