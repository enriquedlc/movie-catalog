import { AuthServicePort } from "../domain/auth-service.port";

export class SignInUseCase {
  constructor(private readonly authService: AuthServicePort) {}

  async execute(email: string, password: string) {
    return this.authService.signIn(email, password);
  }
}
