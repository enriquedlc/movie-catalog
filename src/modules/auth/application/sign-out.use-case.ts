import { TokenRepository } from "@/shared/token/domain/TokenRepository";
import { AuthServicePort } from "../domain/auth-service.port";

export class SignOutUseCase {
  constructor(
    private readonly authService: AuthServicePort,
    private readonly tokenRepository: TokenRepository
  ) {}

  async execute() {
    this.authService.signOut();
    await this.tokenRepository.remove();
  }
}
