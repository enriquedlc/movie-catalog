import { TokenRepository } from "../domain/TokenRepository";

export function getToken(tokenRepository: TokenRepository) {
  return async (): Promise<string | null> => {
    return tokenRepository.get();
  };
}
