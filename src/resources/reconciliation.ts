import type { Omnesight } from "../client.js";
import type { DiscrepancyReport } from "../types/index.js";

export class ReconciliationResource {
  constructor(private readonly client: Omnesight) {}

  /**
   * Scan for cross-ledger, billing, or ERP discrepancies.
   */
  async scanDiscrepancies(options: {
    erpSystem?: string;
    entityType?: string;
    lookbackDays?: number;
  } = {}): Promise<DiscrepancyReport[]> {
    const params = new URLSearchParams({
      erp_system: options.erpSystem ?? "SAP",
      entity_type: options.entityType ?? "PURCHASE_ORDERS",
      lookback_days: String(options.lookbackDays ?? 7),
    });

    const res = await this.client.request<{ discrepancies: DiscrepancyReport[] }>(
      "GET",
      `/api/v1/reconciliation/discrepancies?${params.toString()}`
    );
    return res.discrepancies ?? [];
  }
}
