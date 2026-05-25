"use client";

import { useCallback, useMemo, useState } from "react";
import { useStellarWallet } from "@/hooks/useStellarWallet";
import { nextLifecycle, reconcileGameplayState, type GameplayTxSnapshot } from "@/lib/stellar/gameplay-flow";

export function useGameplayTx() {
  const wallet = useStellarWallet();
  const [snapshot, setSnapshot] = useState<GameplayTxSnapshot>({});

  const execute = useCallback(
    async (transactionXdr: string, optimisticSessionId?: string) => {
      const id = crypto.randomUUID();
      wallet.setTxStatus(nextLifecycle(id, "signing"));
      setSnapshot({ pendingId: id, optimisticSessionId });

      try {
        const signed = await wallet.signTransaction(transactionXdr);
        wallet.setTxStatus(nextLifecycle(id, "submitting"));

        const submitted = await wallet.submitTransaction(signed);
        const status = nextLifecycle(id, "success");

        wallet.setTxStatus({ ...status, txHash: submitted.hash });
        setSnapshot(
          reconcileGameplayState({
            status: { ...status, txHash: submitted.hash },
            optimisticSessionId,
            txHash: submitted.hash,
          }),
        );

        return submitted;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown transaction error";
        const status = nextLifecycle(id, "error", message);
        wallet.setTxStatus(status);
        setSnapshot(
          reconcileGameplayState({
            status,
            optimisticSessionId,
          }),
        );
        throw error;
      }
    },
    [wallet],
  );

  const networkMismatch = useMemo(() => {
    const configured = process.env.NEXT_PUBLIC_STELLAR_NETWORK;
    if (!configured) return false;
    return configured !== wallet.network;
  }, [wallet.network]);

  return {
    execute,
    snapshot,
    networkMismatch,
    walletStatus: wallet.status,
  };
}
