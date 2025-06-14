import { TokenRepository } from "@/shared/token/domain/TokenRepository";
import { AuthServicePort } from "../domain/auth-service.port";

export class SignOutUseCase {
  constructor(
    private readonly authService: AuthServicePort,
    private readonly tokenRepository: TokenRepository
  ) {}

  async execute() {
    const token = await this.tokenRepository.get();
    if (!token) return;
    await this.authService.signOut(token);
    await this.tokenRepository.remove();
  }
}
