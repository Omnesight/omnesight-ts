import type { Omnesight } from "../client.js";
import type {
  SandalfonChatParams,
  SandalfonChatResponse,
  SandalfonDiscoverParams,
  SandalfonDiscoverResponse,
} from "../types/index.js";

export class SandalfonResource {
  constructor(private readonly client: Omnesight) {}

  /**
   * Discover differential equations (SINDy), FFT precursor spectrums, and Popperian verification.
   */
  async discover(params: SandalfonDiscoverParams = {}): Promise<SandalfonDiscoverResponse> {
    const payload = {
      preset: params.preset ?? "coupled_oscillator",
      noise_level: params.noise_level ?? 0.02,
      sparsity_threshold: params.sparsity_threshold ?? 0.1,
      precursor_amp: params.precursor_amp ?? 0.18,
      hypothesis_text: params.hypothesis_text,
    };
    return this.client.request<SandalfonDiscoverResponse>("POST", "/api/v1/sandalfon/discover", payload);
  }

  /**
   * Conversational scientific research query for Sandalfon.
   */
  async chat(params: SandalfonChatParams | string): Promise<SandalfonChatResponse> {
    const payload = typeof params === "string" ? { message: params } : params;
    return this.client.request<SandalfonChatResponse>("POST", "/api/v1/sandalfon/chat", payload);
  }
}
