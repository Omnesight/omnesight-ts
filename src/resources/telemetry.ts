import type { Omnesight } from "../client.js";
import type { TelemetryIngestResponse, TelemetryRecord } from "../types/index.js";

export class TelemetryResource {
  constructor(private readonly client: Omnesight) {}

  /**
   * Ingest a batch of operational telemetry records into Omnesight real-time pipelines.
   */
  async ingest(streamId: string, records: TelemetryRecord[]): Promise<TelemetryIngestResponse> {
    const payload = {
      stream_id: streamId,
      records,
    };
    return this.client.request<TelemetryIngestResponse>("POST", "/api/v1/telemetry/ingest", payload);
  }
}
