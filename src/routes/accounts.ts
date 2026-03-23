import { Router, Request, Response } from "express";
import {
  getAccountById,
  getAllAccounts,
  getTransactionsByAccount,
} from "../data/seed";

const router = Router();

// ─── Helper ───────────────────────────────────────────────────────────────────

function ok<T>(res: Response, data: T): void {
  res.json({ success: true, timestamp: new Date().toISOString(), data });
}

function notFound(res: Response, resource: string, id: string): void {
  res.status(404).json({
    success: false,
    timestamp: new Date().toISOString(),
    error: { code: "NOT_FOUND", message: `${resource} '${id}' not found.` },
  });
}

// ─── GET /accounts/summary ────────────────────────────────────────────────────

router.get("/summary", (_req: Request, res: Response) => {
  const all = getAllAccounts();
  const activeAccounts = all.filter((a) => a.status === "active");

  const totalAvailableBalance = activeAccounts.reduce(
    (sum, a) => sum + a.availableBalance,
    0
  );

  ok(res, {
    accountHolder: all[0]?.accountName ?? "Unknown",
    totalAccounts: all.length,
    totalAvailableBalance,
    currency: "IDR",
    accounts: all.map((a) => ({
      accountId: a.id,
      accountNumber: a.accountNumber,
      productName: a.productName,
      currency: a.currency,
      availableBalance: a.availableBalance,
      status: a.status,
    })),
  });
});

// ─── GET /accounts/:id/balance ────────────────────────────────────────────────

router.get("/:id/balance", (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const account = getAccountById(id);
  if (!account) return notFound(res, "Account", id);

  ok(res, {
    accountId: account.id,
    accountNumber: account.accountNumber,
    accountName: account.accountName,
    productName: account.productName,
    currency: account.currency,
    availableBalance: account.availableBalance,
    ledgerBalance: account.ledgerBalance,
    minimumBalance: account.minimumBalance,
    minimumBalanceMet: account.availableBalance >= account.minimumBalance,
    status: account.status,
  });
});

// ─── GET /accounts/:id/transactions ──────────────────────────────────────────
// Query params:
//   ?limit=5|10|20        — number of results (default: 10)
//   ?from=YYYY-MM-DD      — start date filter
//   ?to=YYYY-MM-DD        — end date filter
//   ?status=pending       — filter by status

router.get("/:id/transactions", (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const account = getAccountById(id);
  if (!account) return notFound(res, "Account", id);

  const { limit, from, to, status } = req.query as Record<string, string>;

  const parsedLimit = limit ? parseInt(limit, 10) : 10;

  const txns = getTransactionsByAccount(id, {
    limit: isNaN(parsedLimit) ? 10 : parsedLimit,
    from,
    to,
    status,
  });

  ok(res, {
    accountId: id,
    count: txns.length,
    filters: { limit: parsedLimit, from: from ?? null, to: to ?? null, status: status ?? null },
    transactions: txns,
  });
});

export default router;
