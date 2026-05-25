import type { TxLifecycleStatus } from "./soroban";

export type GameplayTxKind = "create_session" | "submit_guess" | "finalize_session";

export interface GameplayTxSnapshot {
  pendingId?: string;
  optimisticSessionId?: string;
  confirmedHash?: string;
  lastError?: string;
}

export function nextLifecycle(id: string, state: TxLifecycleStatus["state"], error?: string) {
  return {
    id,
    state,
    error,
  } satisfies TxLifecycleStatus;
}

export function reconcileGameplayState(input: {
  status: TxLifecycleStatus;
  optimisticSessionId?: string;
  txHash?: string;
}): GameplayTxSnapshot {
  if (input.status.state === "error") {
    return {
      pendingId: input.status.id,
      optimisticSessionId: input.optimisticSessionId,
      lastError: input.status.error,
    };
  }

  if (input.status.state === "success") {
    return {
      pendingId: undefined,
      optimisticSessionId: input.optimisticSessionId,
      confirmedHash: input.txHash ?? input.status.txHash,
    };
  }

  if (input.status.state === "signing" || input.status.state === "submitting") {
    return {
      pendingId: input.status.id,
      optimisticSessionId: input.optimisticSessionId,
    };
  }

  return {};
}
