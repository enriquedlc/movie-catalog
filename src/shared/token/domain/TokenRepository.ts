export interface TokenRepository {
  get(): Promise<string | null>;
  set(token: string): Promise<void>;
}
