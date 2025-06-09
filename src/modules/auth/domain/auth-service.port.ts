export interface AuthServicePort {
  signIn(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    message: string;
    token?: string;
  }>;
}
