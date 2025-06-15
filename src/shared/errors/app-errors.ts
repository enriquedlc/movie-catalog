export const ERROR_CODES = {
  UNAUTHORIZED: "UNAUTHORIZED",
  NOT_FOUND: "NOT_FOUND",
} as const;

export class UnauthorizedError extends Error {
  readonly code = ERROR_CODES.UNAUTHORIZED;

  constructor(message = "Unauthorized access") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends Error {
  readonly code = ERROR_CODES.NOT_FOUND;

  constructor(message = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
  }
}
