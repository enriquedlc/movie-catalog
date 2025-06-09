import { TokenRepository } from "@/shared/token/domain/TokenRepository";
import { AuthServicePort } from "../domain/auth-service.port";

export class SignInUseCase {
  constructor(
    private readonly authService: AuthServicePort,
    private readonly tokenRepository: TokenRepository
  ) {}

  async execute(email: string, password: string) {
    const user = await this.authService.signIn(email, password);
    if (user && user.token) {
      await this.tokenRepository.set(user.token);
    }
    return user;
  }
}
