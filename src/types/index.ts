/**
 * Omnesight TypeScript SDK - Type Definitions
 * Schema-aligned with Python SDK & Sovereign MLOps Gateway
 */

export type SandalfonPreset =
  | "coupled_oscillator"
  | "predator_prey_grid"
  | "thermal_runaway";

export interface TelemetryRecord {
  timestamp?: string;
  device_id: string;
  metric: string;
  value: number;
  unit?: string;
  metadata?: Record<string, unknown>;
}

export interface TelemetryIngestResponse {
  batch_id: string;
  records_received: number;
  records_committed: number;
  duration_ms: number;
  status: string;
}

export interface DiscrepancyReport {
  discrepancy_id: string;
  entity_a_type: string;
  entity_a_id: string;
  entity_b_type: string;
  entity_b_id: string;
  variance_amount_usd: number;
  variance_pct: number;
  status: string;
  detected_at: string;
  recommended_action_id?: string;
}

export interface ActionApprovalRequest {
  action_id: string;
  action_type: string;
  target_entity: string;
  decision: "APPROVE" | "REJECT" | "MODIFIED";
  supervisor_id: string;
  supervisor_notes?: string;
}

export interface ActionStatusResponse {
  action_id: string;
  state: "PROPOSED" | "SUPERVISED_APPROVAL" | "COMMITTED" | "REVERTED";
  action_type: string;
  financial_impact_usd: number;
  sha256_audit_hash: string;
  executed_at?: string;
}

export interface HackmalimInferParams {
  shock_amplitude?: number;
  jitter_severity?: number;
  inlet_n0?: number;
  inlet_n1?: number;
  leak_node?: number;
  leak_magnitude?: number;
  p_max_kw?: number;
  t_max_c?: number;
  autonomous_budget_usd?: number;
}

export interface HackmalimInferResponse {
  model: string;
  version: string;
  latency_ms?: number;
  inference_latency_ms?: number;
  computed_stress_z?: number;
  target_entity_id?: string;
  liquid_ode?: Record<string, unknown>;
  stage_1_liquid_ode?: Record<string, unknown>;
  pignn?: Record<string, unknown>;
  stage_2_pignn?: Record<string, unknown>;
  causal?: Record<string, unknown>;
  stage_3_causal_symbolic?: Record<string, unknown>;
  action_policy?: Record<string, unknown>;
  guardrails?: Record<string, unknown>;
  enterprise_guardrail?: Record<string, unknown>;
}

export interface SandalfonDiscoverParams {
  preset?: SandalfonPreset;
  noise_level?: number;
  sparsity_threshold?: number;
  precursor_amp?: number;
  hypothesis_text?: string;
}

export interface SandalfonDiscoverResponse {
  model: string;
  version: string;
  latency_ms: number;
  hypothesis_text: string;
  sindy: Record<string, unknown>;
  spectrum: Record<string, unknown>;
  hypothesis_test: Record<string, unknown>;
  discovery_proof_sha256: string;
}

export interface SandalfonChatParams {
  message: string;
  preset?: SandalfonPreset;
  noise_level?: number;
  sparsity_threshold?: number;
  precursor_amp?: number;
}

export interface SandalfonChatResponse {
  model: string;
  version: string;
  query?: string;
  preset_used?: string;
  parameters_used?: Record<string, unknown>;
  applied_controls?: Record<string, unknown>;
  spoken_reply: string;
  voice_lang?: string;
  experiment?: Record<string, unknown>;
  sindy?: Record<string, unknown>;
  spectrum?: Record<string, unknown>;
  hypothesis_test?: Record<string, unknown>;
  discovery_proof_sha256?: string;
}

export interface ClientOptions {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
  sandbox?: boolean;
}
