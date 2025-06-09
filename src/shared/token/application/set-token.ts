import { TokenRepository } from "../domain/TokenRepository";

export function setToken(tokenRepository: TokenRepository) {
  return async (token: string): Promise<void> => {
    await tokenRepository.set(token);
  };
}
