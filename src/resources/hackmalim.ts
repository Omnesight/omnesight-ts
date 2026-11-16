import type { Omnesight } from "../client.js";
import type { HackmalimInferParams, HackmalimInferResponse } from "../types/index.js";

export class HackmalimResource {
  constructor(private readonly client: Omnesight) {}

  /**
   * Retrieve Hackmalim model card, parameter counts, and layer metrics.
   */
  async info(): Promise<Record<string, unknown>> {
    return this.client.request<Record<string, unknown>>("GET", "/api/v1/hackmalim/info");
  }

  /**
   * Run 3-layer closed loop inference:
   * 1. Liquid Neural ODE
   * 2. Physics-Informed GNN
   * 3. Causal SAT Verifier
   */
  async infer(params: HackmalimInferParams = {}): Promise<HackmalimInferResponse> {
    const payload = {
      shock_amplitude: params.shock_amplitude ?? 1.45,
      jitter_severity: params.jitter_severity ?? 1.0,
      inlet_n0: params.inlet_n0 ?? 60.0,
      inlet_n1: params.inlet_n1 ?? 50.0,
      leak_node: params.leak_node ?? 2,
      leak_magnitude: params.leak_magnitude ?? 22.5,
      p_max_kw: params.p_max_kw ?? 55.0,
      t_max_c: params.t_max_c ?? 72.0,
      autonomous_budget_usd: params.autonomous_budget_usd ?? 4200.0,
    };
    return this.client.request<HackmalimInferResponse>("POST", "/api/v1/hackmalim/infer", payload);
  }
}
