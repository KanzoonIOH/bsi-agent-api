import { z } from "zod";

// ─── Base ─────────────────────────────────────────────────────────────────────

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    timestamp: z.string(),
    data: dataSchema,
  });

export const ApiErrorSchema = z.object({
  success: z.literal(false),
  timestamp: z.string(),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});

// ─── Account Schemas ──────────────────────────────────────────────────────────

export const BalanceSchema = z.object({
  accountId: z.string(),
  accountNumber: z.string(),
  accountName: z.string(),
  productName: z.string(),
  currency: z.string(),
  availableBalance: z.number(),
  ledgerBalance: z.number(),
  minimumBalance: z.number(),
  minimumBalanceMet: z.boolean(),
  status: z.enum(["active", "dormant", "closed"]),
});

export const AccountSummaryItemSchema = z.object({
  accountId: z.string(),
  accountNumber: z.string(),
  productName: z.string(),
  currency: z.string(),
  availableBalance: z.number(),
  status: z.enum(["active", "dormant", "closed"]),
});

export const AccountSummarySchema = z.object({
  accountHolder: z.string(),
  totalAccounts: z.number(),
  totalAvailableBalance: z.number(),
  currency: z.string(),
  accounts: z.array(AccountSummaryItemSchema),
});

// ─── Card Schemas ─────────────────────────────────────────────────────────────

export const CardBalanceSchema = z.object({
  cardId: z.string(),
  cardNumber: z.string(),
  cardHolder: z.string(),
  currency: z.string(),
  outstandingBalance: z.number(),
});

export const CardLimitSchema = z.object({
  cardId: z.string(),
  cardNumber: z.string(),
  creditLimit: z.number(),
  availableCredit: z.number(),
  currency: z.string(),
});

export const CardBillingSchema = z.object({
  cardId: z.string(),
  cardNumber: z.string(),
  outstandingBalance: z.number(),
  minimumPayment: z.number(),
  paymentDueDate: z.string(),
  currency: z.string(),
});

export const CardRewardsSchema = z.object({
  cardId: z.string(),
  cardNumber: z.string(),
  cardHolder: z.string(),
  rewardPoints: z.number(),
  rewardTier: z.string(),
});

export const CardStatusSchema = z.object({
  cardId: z.string(),
  cardNumber: z.string(),
  cardHolder: z.string(),
  cardType: z.enum(["debit", "credit"]),
  network: z.enum(["Visa", "Mastercard", "GPN"]),
  status: z.enum(["active", "blocked", "expired", "pending_activation"]),
  expiryDate: z.string(),
});

// ─── Transaction Schemas ──────────────────────────────────────────────────────

export const TransactionSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  date: z.string(),
  valueDate: z.string(),
  amount: z.number(),
  type: z.enum(["debit", "credit"]),
  status: z.enum(["settled", "pending", "failed"]),
  description: z.string(),
  merchant: z.string().nullable(),
  category: z.string(),
  referenceNumber: z.string(),
  balance: z.number(),
});

export const TransactionListSchema = z.object({
  accountId: z.string(),
  count: z.number(),
  transactions: z.array(TransactionSchema),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type Balance = z.infer<typeof BalanceSchema>;
export type AccountSummary = z.infer<typeof AccountSummarySchema>;
export type CardBalance = z.infer<typeof CardBalanceSchema>;
export type CardLimit = z.infer<typeof CardLimitSchema>;
export type CardBilling = z.infer<typeof CardBillingSchema>;
export type CardRewards = z.infer<typeof CardRewardsSchema>;
export type CardStatus = z.infer<typeof CardStatusSchema>;
export type TransactionItem = z.infer<typeof TransactionSchema>;
export type TransactionList = z.infer<typeof TransactionListSchema>;
