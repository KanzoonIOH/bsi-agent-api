import { Router, Request, Response } from "express";
import { getCardById } from "../data/seed";

const router = Router();

// ─── Helper ───────────────────────────────────────────────────────────────────

function ok<T>(res: Response, data: T): void {
  res.json({ success: true, timestamp: new Date().toISOString(), data });
}

function notFound(res: Response, id: string): void {
  res.status(404).json({
    success: false,
    timestamp: new Date().toISOString(),
    error: { code: "NOT_FOUND", message: `Card '${id}' not found.` },
  });
}

function creditOnly(res: Response, id: string): void {
  res.status(400).json({
    success: false,
    timestamp: new Date().toISOString(),
    error: {
      code: "INVALID_CARD_TYPE",
      message: `Card '${id}' is not a credit card. This endpoint is only available for credit cards.`,
    },
  });
}

// ─── GET /cards/:id/balance ───────────────────────────────────────────────────

router.get("/:id/balance", (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const card = getCardById(id);
  if (!card) return notFound(res, id);
  if (card.cardType !== "credit") return creditOnly(res, id);

  ok(res, {
    cardId: card.id,
    cardNumber: card.cardNumber,
    cardHolder: card.cardHolder,
    currency: "IDR",
    outstandingBalance: card.outstandingBalance,
  });
});

// ─── GET /cards/:id/limit ─────────────────────────────────────────────────────

router.get("/:id/limit", (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const card = getCardById(id);
  if (!card) return notFound(res, id);
  if (card.cardType !== "credit") return creditOnly(res, id);

  ok(res, {
    cardId: card.id,
    cardNumber: card.cardNumber,
    currency: "IDR",
    creditLimit: card.creditLimit,
    availableCredit: card.availableCredit,
    utilizationRate:
      card.creditLimit > 0
        ? parseFloat(
            ((card.outstandingBalance / card.creditLimit) * 100).toFixed(2)
          )
        : 0,
  });
});

// ─── GET /cards/:id/billing ───────────────────────────────────────────────────

router.get("/:id/billing", (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const card = getCardById(id);
  if (!card) return notFound(res, id);
  if (card.cardType !== "credit") return creditOnly(res, id);

  ok(res, {
    cardId: card.id,
    cardNumber: card.cardNumber,
    currency: "IDR",
    outstandingBalance: card.outstandingBalance,
    minimumPayment: card.minimumPayment,
    paymentDueDate: card.paymentDueDate,
  });
});

// ─── GET /cards/:id/rewards ───────────────────────────────────────────────────

router.get("/:id/rewards", (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const card = getCardById(id);
  if (!card) return notFound(res, id);

  ok(res, {
    cardId: card.id,
    cardNumber: card.cardNumber,
    cardHolder: card.cardHolder,
    rewardPoints: card.rewardPoints,
    rewardTier: card.rewardTier,
  });
});

// ─── GET /cards/:id/status ────────────────────────────────────────────────────

router.get("/:id/status", (req: Request, res: Response) => {
  const id = req.params["id"] as string;
  const card = getCardById(id);
  if (!card) return notFound(res, id);

  ok(res, {
    cardId: card.id,
    cardNumber: card.cardNumber,
    cardHolder: card.cardHolder,
    cardType: card.cardType,
    network: card.network,
    status: card.status,
    expiryDate: card.expiryDate,
  });
});

export default router;
