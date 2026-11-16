import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  Omnesight,
  AuthenticationError,
  DEFAULT_BASE_URL,
  SANDBOX_BASE_URL,
} from "../dist/index.js";

describe("Omnesight TypeScript SDK", () => {
  it("should fail initialization if no API key is provided and sandbox=false", () => {
    assert.throws(() => new Omnesight(), AuthenticationError);
  });

  it("should initialize in Sandbox mode with default values", () => {
    const client = new Omnesight({ sandbox: true });
    assert.equal(client.isSandbox, true);
    assert.equal(client.baseUrl, SANDBOX_BASE_URL);
    assert.equal(client.apiKey, "omne_sandbox_local_token");
  });

  it("should auto-enable sandbox if apiKey starts with omne_sandbox_", () => {
    const client = new Omnesight({ apiKey: "omne_sandbox_demo_key" });
    assert.equal(client.isSandbox, true);
  });

  it("should execute Sandalfon scientific discovery in offline sandbox", async () => {
    const client = new Omnesight({ sandbox: true });
    const discovery = await client.sandalfon.discover({
      preset: "thermal_runaway",
      hypothesis_text: "Detect cable harmonics",
    });

    assert.equal(discovery.model, "sandalfon-v1.0");
    assert.ok(discovery.sindy["discovered_eq_x"]);
    assert.equal(discovery.hypothesis_test["is_falsified"], false);
    assert.ok(typeof discovery.spectrum["precursor_snr_db"] === "number");
  });

  it("should execute Sandalfon conversational chat in offline sandbox", async () => {
    const client = new Omnesight({ sandbox: true });
    const reply = await client.sandalfon.chat("Check harmonic stability");

    assert.equal(reply.model, "sandalfon-v1.0");
    assert.ok(reply.spoken_reply.length > 0);
  });

  it("should execute Hackmalim 3-layer neural control in offline sandbox", async () => {
    const client = new Omnesight({ sandbox: true });
    const control = await client.hackmalim.infer({
      shock_amplitude: 1.8,
      leak_node: 3,
    });

    assert.equal(control.model, "hackmalim-v1.0");
    assert.equal(control.stage_2_pignn?.["pinpointed_node"], 3);
    assert.equal(control.enterprise_guardrail?.["is_approved"], true);
  });

  it("should execute Telemetry batch ingestion in offline sandbox", async () => {
    const client = new Omnesight({ sandbox: true });
    const res = await client.telemetry.ingest("power_node_01", [
      { device_id: "dev_01", metric: "temp_c", value: 45.2 },
    ]);

    assert.equal(res.records_received, 1);
    assert.equal(res.status, "COMMITTED_SANDBOX");
  });

  it("should scan ERP cross-ledger discrepancies in offline sandbox", async () => {
    const client = new Omnesight({ sandbox: true });
    const reports = await client.reconciliation.scanDiscrepancies({
      erpSystem: "AMPLITUDE",
    });

    assert.ok(reports.length >= 2);
    assert.equal(reports[0]?.discrepancy_id, "DISC-SBX-001");
    assert.equal(reports[0]?.variance_amount_usd, 1450.0);
  });

  it("should retrieve Supervised Action Protocol status in offline sandbox", async () => {
    const client = new Omnesight({ sandbox: true });
    const action = await client.actions.getStatus("ACT-SBX-001");

    assert.equal(action.action_id, "ACT-SBX-001");
    assert.equal(action.state, "SUPERVISED_APPROVAL");
  });
});
