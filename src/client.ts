/**
 * Omnesight TypeScript SDK - Main Client
 * High-performance enterprise client supporting synchronous/asynchronous execution,
 * offline deterministic sandbox, and custom VPC sovereign gateways.
 */

import {
  AuthenticationError,
  InternalServerError,
  NotFoundError,
  OmnesightError,
  PolicyViolationError,
  RateLimitError,
} from "./errors.js";
import { ActionsResource } from "./resources/actions.js";
import { HackmalimResource } from "./resources/hackmalim.js";
import { ReconciliationResource } from "./resources/reconciliation.js";
import { SandalfonResource } from "./resources/sandalfon.js";
import { TelemetryResource } from "./resources/telemetry.js";
import {
  DEFAULT_SANDBOX_TOKEN,
  SANDBOX_BASE_URL,
  SandboxEngine,
} from "./sandbox.js";
import type { ClientOptions } from "./types/index.js";

declare const process: {
  env?: Record<string, string | undefined>;
} | undefined;

export const DEFAULT_BASE_URL = "https://mlops-api.omnesight.com";
export const SDK_USER_AGENT = "omnesight-ts-sdk/1.2.0";

const STATUS_EXCEPTIONS: Record<number, new (msg: string, code?: number) => OmnesightError> = {
  401: AuthenticationError,
  403: AuthenticationError,
  404: NotFoundError,
  422: PolicyViolationError,
  429: RateLimitError,
};

export class Omnesight {
  readonly apiKey: string;
  readonly baseUrl: string;
  readonly timeout: number;
  readonly maxRetries: number;
  readonly isSandbox: boolean;

  readonly sandalfon: SandalfonResource;
  readonly hackmalim: HackmalimResource;
  readonly telemetry: TelemetryResource;
  readonly reconciliation: ReconciliationResource;
  readonly actions: ActionsResource;

  private readonly sandboxEngine?: SandboxEngine;

  constructor(options: ClientOptions = {}) {
    const envKey = typeof process !== "undefined" ? process.env?.["OMNESIGHT_API_KEY"] : undefined;
    const envUrl = typeof process !== "undefined" ? process.env?.["OMNESIGHT_BASE_URL"] : undefined;
    const envSandbox =
      typeof process !== "undefined"
        ? ["1", "true", "yes"].includes(process.env?.["OMNESIGHT_SANDBOX"]?.toLowerCase() ?? "")
        : false;

    const rawKey = options.apiKey || envKey;
    this.isSandbox = Boolean(
      options.sandbox ||
        envSandbox ||
        (rawKey && (rawKey.startsWith("omne_sandbox_") || rawKey.startsWith("omne_test_")))
    );

    if (!rawKey) {
      if (this.isSandbox) {
        this.apiKey = DEFAULT_SANDBOX_TOKEN;
      } else {
        throw new AuthenticationError(
          "API key must be provided or set via OMNESIGHT_API_KEY environment variable. " +
            "To evaluate without credentials, initialize with { sandbox: true }."
        );
      }
    } else {
      this.apiKey = rawKey;
    }

    const defaultUrl = this.isSandbox ? SANDBOX_BASE_URL : DEFAULT_BASE_URL;
    this.baseUrl = (options.baseUrl || envUrl || defaultUrl).replace(/\/$/, "");
    this.timeout = options.timeout ?? 30000;
    this.maxRetries = options.maxRetries ?? 3;

    if (this.isSandbox && this.baseUrl === SANDBOX_BASE_URL) {
      this.sandboxEngine = new SandboxEngine();
    }

    this.sandalfon = new SandalfonResource(this);
    this.hackmalim = new HackmalimResource(this);
    this.telemetry = new TelemetryResource(this);
    this.reconciliation = new ReconciliationResource(this);
    this.actions = new ActionsResource(this);
  }

  async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    // 1. Route to in-memory SandboxEngine if running in offline sandbox mode
    if (this.sandboxEngine) {
      return this.sandboxEngine.handle(path, method, body) as T;
    }

    // 2. Production HTTP Transport with retries & timeouts
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      "X-API-Key": this.apiKey,
      "Content-Type": "application/json",
      "User-Agent": SDK_USER_AGENT,
    };

    if (this.isSandbox) {
      headers["X-Omnesight-Sandbox"] = "true";
    }

    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        const response = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          return (await response.json()) as T;
        }

        let errorMsg = await response.text();
        try {
          const parsed = JSON.parse(errorMsg);
          errorMsg = parsed.message || parsed.detail || errorMsg;
        } catch {
          // keep text error
        }

        const ExcClass = STATUS_EXCEPTIONS[response.status] || InternalServerError;
        throw new ExcClass(errorMsg, response.status);
      } catch (err: unknown) {
        lastError = err as Error;
        if (err instanceof OmnesightError && err.statusCode && err.statusCode < 500) {
          throw err; // Do not retry client errors (401, 403, 404, 422)
        }
        if (attempt === this.maxRetries) {
          break;
        }
        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 150));
      }
    }

    throw new InternalServerError(
      `Connection to Omnesight infrastructure failed: ${lastError?.message ?? "Unknown error"}`
    );
  }
}
