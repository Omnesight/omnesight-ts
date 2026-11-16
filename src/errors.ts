/**
 * Omnesight TypeScript SDK - Error Hierarchy
 */

export class OmnesightError extends Error {
  readonly statusCode?: number;
  readonly details?: unknown;

  constructor(message: string, statusCode?: number, details?: unknown) {
    super(message);
    this.name = "OmnesightError";
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class AuthenticationError extends OmnesightError {
  constructor(message: string, statusCode = 401, details?: unknown) {
    super(message, statusCode, details);
    this.name = "AuthenticationError";
  }
}

export class PolicyViolationError extends OmnesightError {
  constructor(message: string, statusCode = 422, details?: unknown) {
    super(message, statusCode, details);
    this.name = "PolicyViolationError";
  }
}

export class RateLimitError extends OmnesightError {
  constructor(message: string, statusCode = 429, details?: unknown) {
    super(message, statusCode, details);
    this.name = "RateLimitError";
  }
}

export class NotFoundError extends OmnesightError {
  constructor(message: string, statusCode = 404, details?: unknown) {
    super(message, statusCode, details);
    this.name = "NotFoundError";
  }
}

export class InternalServerError extends OmnesightError {
  constructor(message: string, statusCode = 500, details?: unknown) {
    super(message, statusCode, details);
    this.name = "InternalServerError";
  }
}
