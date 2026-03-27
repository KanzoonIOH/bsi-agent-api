import { Router, Request, Response } from "express";
import { getTransactionById } from "../data";

const router = Router();

// ─── GET /transactions/:txn_id ────────────────────────────────────────────────

router.get("/:txn_id", async (req: Request, res: Response) => {
  const txnId = req.params["txn_id"] as string;
  const txn = await getTransactionById(txnId);

  if (!txn) {
    res.status(404).json({
      success: false,
      timestamp: new Date().toISOString(),
      error: {
        code: "NOT_FOUND",
        message: `Transaction '${txnId}' not found.`,
      },
    });
    return;
  }

  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: txn,
  });
});

export default router;
