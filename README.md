# Omnesight TypeScript SDK (`@omnesight/sdk`)

Official TypeScript/JavaScript SDK for **Omnesight Sovereign Operational Intelligence & Autonomous Execution Infrastructure**.

[![npm version](https://img.shields.io/npm/v/@omnesight/sdk.svg?style=flat-square&color=blue)](https://www.npmjs.com/package/@omnesight/sdk)
[![License](https://img.shields.io/badge/license-Apache--2.0-green.svg?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7+-blue.svg?style=flat-square)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-brightgreen.svg?style=flat-square)](https://nodejs.org/)

---

## Features

- **Sandalfon v1.0**: Scientific equation discovery (SINDy sparse regression), FFT spectral wave precursor detection, and Popperian falsification tests.
- **Hackmalim v1.0**: Sovereign 3-layer continuous neural control (Liquid Neural ODE + Kirchhoff Physics-Informed GNN + Causal Symbolic SAT Verifier).
- **Supervised Action Protocol (SAP)**: Inline runtime execution firewall preventing unauthorized agentic actions and state-machine drift with cryptographic provenance.
- **Enterprise Ledger Reconciliation**: Real-time cross-ledger auditing and automated suspense clearing (Core Banking, Switch, Mobile Money, ERP).
- **Zero-Config Offline Sandbox**: Instant evaluation and testing with `sandbox: true` without requiring API keys or live servers.
- **Zero Runtime Dependencies**: Powered entirely by native standard Web APIs (`fetch`, `AbortController`). Fully compatible with Node.js 18+, Bun, Deno, Cloudflare Workers, and browser environments.

---

## Installation

```bash
# npm
npm install @omnesight/sdk

# yarn
yarn add @omnesight/sdk

# pnpm
pnpm add @omnesight/sdk

# bun
bun add @omnesight/sdk
```

---

## Quickstart

### 1. Instant Offline Sandbox (Zero Credentials Required)

```typescript
import { Omnesight } from "@omnesight/sdk";

// Initialize offline deterministic sandbox
const client = new Omnesight({ sandbox: true });

// 1. Sandalfon Scientific Discovery (SINDy + FFT)
const discovery = await client.sandalfon.discover({
  preset: "thermal_runaway",
  hypothesis_text: "Detect harmonic cable thermal runaway precursors",
});

console.log("Discovered ODE:", discovery.sindy.discovered_eq_x);
console.log("Popperian Z-Score:", discovery.hypothesis_test.z_score);

// 2. Hackmalim 3-Layer Neural Control
const control = await client.hackmalim.infer({
  shock_amplitude: 1.45,
  leak_node: 2,
});

console.log("Pinpointed Node:", control.stage_2_pignn?.pinpointed_node);
console.log("Guardrail Approved:", control.enterprise_guardrail?.is_approved);

// 3. Scan Cross-Ledger Discrepancies
const discrepancies = await client.reconciliation.scanDiscrepancies({
  erpSystem: "AMPLITUDE",
});
console.log(`Audited ${discrepancies.length} discrepancy reports in sandbox.`);
```

---

### 2. Production Gateway & Sovereign VPC Execution

```typescript
import { Omnesight } from "@omnesight/sdk";

const client = new Omnesight({
  apiKey: process.env.OMNESIGHT_API_KEY, // Or pass directly
  baseUrl: "https://mlops-api.omnesight.com", // Or private VPC gateway
});

// Telemetry Ingestion
await client.telemetry.ingest("power_substation_01", [
  {
    device_id: "sensor_alpha_09",
    metric: "core_temp_celsius",
    value: 78.4,
    metadata: { rack_id: "R-12" },
  },
]);

// Supervised Action Protocol (SAP)
const action = await client.actions.getStatus("ACT-2026-9901");
console.log("Action Audit Hash (SHA-256):", action.sha256_audit_hash);
```

---

## Dual Package Support (ESM & CommonJS)

Works seamlessly in both ES Modules and CommonJS:

```javascript
// ESM
import { Omnesight } from "@omnesight/sdk";

// CommonJS
const { Omnesight } = require("@omnesight/sdk");
```

---

## License

Apache-2.0. Copyright (c) 2026 Omnesight Inc.
