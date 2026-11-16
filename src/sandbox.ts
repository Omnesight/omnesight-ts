/**
 * Omnesight TypeScript SDK - Offline Sandbox Simulation Engine
 * Intercepts requests and simulates deterministic responses in-memory
 */

import type {
  ActionStatusResponse,
  DiscrepancyReport,
  HackmalimInferParams,
  HackmalimInferResponse,
  SandalfonChatParams,
  SandalfonChatResponse,
  SandalfonDiscoverParams,
  SandalfonDiscoverResponse,
  TelemetryIngestResponse,
  TelemetryRecord,
} from "./types/index.js";

export const SANDBOX_BASE_URL = "https://sandbox.omnesight.com";
export const DEFAULT_SANDBOX_TOKEN = "omne_sandbox_local_token";

export class SandboxEngine {
  handle(path: string, method: string, body?: unknown): unknown {
    const cleanPath = path.split("?")[0]?.replace(/\/$/, "") ?? "";
    const now = new Date().toISOString();

    // 1. Hackmalim info
    if (method === "GET" && cleanPath === "/api/v1/hackmalim/info") {
      return {
        model: "hackmalim-v1.0",
        version: "1.0.0-sandbox",
        environment: "Omnesight Local Sandbox (TypeScript)",
        layers: [
          "Continuous-Time Liquid Neural ODE",
          "Physics-Informed GNN (Kirchhoff laws)",
          "Causal Symbolic SAT Verifier",
        ],
        parameters_total: 14250000,
        status: "SANDBOX_ACTIVE",
      };
    }

    // 2. Hackmalim infer
    if (method === "POST" && cleanPath === "/api/v1/hackmalim/infer") {
      const params = (body as HackmalimInferParams) || {};
      const leakNode = params.leak_node ?? 2;
      const res: HackmalimInferResponse = {
        model: "hackmalim-v1.0",
        version: "1.0.0",
        latency_ms: 0.85,
        inference_latency_ms: 0.85,
        computed_stress_z: 2.41,
        target_entity_id: `OMNE-SBX-NODE-0${leakNode}`,
        liquid_ode: {
          status: "STABLE",
          shock_dissipated: true,
          energy_residual_joules: 142.5,
          trajectory_timesteps: 50,
        },
        stage_1_liquid_ode: { state: "CONVERGED" },
        pignn: {
          pinpointed_node: leakNode,
          confidence_score: 0.9984,
          leak_detected: true,
          pressure_drop_pct: 14.8,
        },
        stage_2_pignn: { pinpointed_node: leakNode },
        causal: {
          satisfiable: true,
          policy_violations_count: 0,
          mitigation_action: "DIVERT_FLOW_NODE_04",
        },
        stage_3_causal_symbolic: { verified: true },
        action_policy: {
          policy_id: "SAP-RULE-AUTO-401",
          decision: "EXECUTE_AUTONOMOUS_INTERVENTION",
        },
        guardrails: {
          is_approved: true,
          financial_exposure_usd: 0.0,
          safety_compliance: "APPROVED",
        },
        enterprise_guardrail: {
          is_approved: true,
          safety_compliance: "APPROVED",
        },
      };
      return res;
    }

    // 3. Sandalfon discover
    if (method === "POST" && cleanPath === "/api/v1/sandalfon/discover") {
      const params = (body as SandalfonDiscoverParams) || {};
      const res: SandalfonDiscoverResponse = {
        model: "sandalfon-v1.0",
        version: "1.0.0",
        latency_ms: 1.15,
        hypothesis_text: params.hypothesis_text || "Sandbox ODE discovery",
        sindy: {
          discovered_eq_x: "dx/dt = -0.854*x + 1.201*y - 0.042*x^3",
          discovered_eq_y: "dy/dt = -1.140*x - 0.312*y + 0.015*x*y",
          sparsity_score: 0.92,
          r2_fit: 0.9982,
        },
        spectrum: {
          precursor_snr_db: 18.42,
          dominant_frequency_hz: 60.05,
          harmonics_detected: [120.1, 180.2],
          spectral_entropy: 0.142,
        },
        hypothesis_test: {
          z_score: 4.18,
          p_value: 0.000029,
          is_falsified: false,
          falsification_verdict: "HYPOTHESIS_CONFIRMED_STATISTICALLY_SIGNIFICANT",
        },
        discovery_proof_sha256:
          "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      };
      return res;
    }

    // 4. Sandalfon chat
    if (method === "POST" && cleanPath === "/api/v1/sandalfon/chat") {
      const params = (body as SandalfonChatParams) || { message: "" };
      const res: SandalfonChatResponse = {
        model: "sandalfon-v1.0",
        version: "1.0.0",
        query: params.message,
        preset_used: params.preset || "thermal_runaway",
        spoken_reply:
          "[Sandbox] Sandalfon scientific engine analysis: Operational telemetry confirms stable convergence. SINDy sparse discovery identified harmonic damping.",
        voice_lang: "en-US",
        sindy: { discovered_eq_x: "dx/dt = -0.854*x + 1.201*y" },
        spectrum: { precursor_snr_db: 18.42 },
        hypothesis_test: { z_score: 4.18, is_falsified: false },
        discovery_proof_sha256:
          "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      };
      return res;
    }

    // 5. Telemetry ingest
    if (method === "POST" && cleanPath === "/api/v1/telemetry/ingest") {
      const payload = (body as { records?: TelemetryRecord[] }) || {};
      const count = payload.records?.length ?? 1;
      const res: TelemetryIngestResponse = {
        batch_id: `sbx_batch_${Date.now()}`,
        records_received: count,
        records_committed: count,
        duration_ms: 0.42,
        status: "COMMITTED_SANDBOX",
      };
      return res;
    }

    // 6. Reconciliation discrepancies
    if (method === "GET" && cleanPath.includes("/api/v1/reconciliation/discrepancies")) {
      const reports: DiscrepancyReport[] = [
        {
          discrepancy_id: "DISC-SBX-001",
          entity_a_type: "GIM_UEMOA_SWITCH",
          entity_a_id: "TX_20261116_09823",
          entity_b_type: "CORE_BANKING_AMPLITUDE",
          entity_b_id: "GL_ACCOUNT_471100",
          variance_amount_usd: 1450.0,
          variance_pct: 1.45,
          status: "FLAGGED_AUTO_RECONCILED",
          detected_at: now,
          recommended_action_id: "ACT-SBX-001",
        },
        {
          discrepancy_id: "DISC-SBX-002",
          entity_a_type: "TELECOM_CDR_STREAM",
          entity_a_id: "CDR_MSISDN_221701234447",
          entity_b_type: "MOBILE_MONEY_FLOAT",
          entity_b_id: "WALLET_FLOAT_RECON",
          variance_amount_usd: 28.5,
          variance_pct: 0.02,
          status: "RESOLVED_CRYPTOGRAPHICALLY",
          detected_at: now,
          recommended_action_id: "ACT-SBX-002",
        },
      ];
      return { discrepancies: reports };
    }

    // 7. Actions get status
    if (method === "GET" && cleanPath.includes("/api/v1/actions/")) {
      const actionId = cleanPath.split("/").pop() || "ACT-SBX-001";
      const res: ActionStatusResponse = {
        action_id: actionId,
        state: "SUPERVISED_APPROVAL",
        action_type: "LEDGER_SUSPENSE_CLEAR",
        financial_impact_usd: 1450.0,
        sha256_audit_hash:
          "a1b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef0",
        executed_at: now,
      };
      return res;
    }

    // 8. Actions submit decision
    if (method === "POST" && cleanPath.includes("/api/v1/actions/") && cleanPath.endsWith("/decision")) {
      const parts = cleanPath.split("/");
      const actionId = parts[parts.length - 2] || "ACT-SBX-001";
      const res: ActionStatusResponse = {
        action_id: actionId,
        state: "COMMITTED",
        action_type: "LEDGER_SUSPENSE_CLEAR",
        financial_impact_usd: 1450.0,
        sha256_audit_hash:
          "b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef01a",
        executed_at: now,
      };
      return res;
    }

    return { status: "ok", sandbox: true, path: cleanPath };
  }
}
