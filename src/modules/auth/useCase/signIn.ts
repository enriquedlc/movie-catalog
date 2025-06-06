import { AuthRepository } from "../domain/AuthRepository";

export class SignInUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<string> {
    return this.authRepository.signIn(email, password);
  }
}
