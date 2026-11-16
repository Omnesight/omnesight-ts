import type { Omnesight } from "../client.js";
import type { ActionApprovalRequest, ActionStatusResponse } from "../types/index.js";

export class ActionsResource {
  constructor(private readonly client: Omnesight) {}

  /**
   * Retrieve state, SHA-256 audit hash, and execution logs of an action.
   */
  async getStatus(actionId: string): Promise<ActionStatusResponse> {
    return this.client.request<ActionStatusResponse>("GET", `/api/v1/actions/${actionId}`);
  }

  /**
   * Submit human supervisor approval or rejection decision.
   */
  async submitDecision(approval: ActionApprovalRequest): Promise<ActionStatusResponse> {
    return this.client.request<ActionStatusResponse>(
      "POST",
      `/api/v1/actions/${approval.action_id}/decision`,
      approval
    );
  }
}
