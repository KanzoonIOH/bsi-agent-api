// ─── Drizzle ORM Schema ───────────────────────────────────────────────────────
// Mirrors the interfaces defined in src/data/seed.ts
// Run `npm run db:generate` to create migrations from this schema.

import {
  pgTable,
  pgEnum,
  varchar,
  bigint,
  text,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const accountStatusEnum = pgEnum("account_status", [
  "active",
  "dormant",
  "closed",
]);

export const cardTypeEnum = pgEnum("card_type", ["debit", "credit"]);

export const cardNetworkEnum = pgEnum("card_network", [
  "Visa",
  "Mastercard",
  "GPN",
]);

export const cardStatusEnum = pgEnum("card_status", [
  "active",
  "blocked",
  "expired",
  "pending_activation",
]);

export const transactionTypeEnum = pgEnum("transaction_type", [
  "debit",
  "credit",
]);

export const transactionStatusEnum = pgEnum("transaction_status", [
  "settled",
  "pending",
  "failed",
]);

// ─── Accounts ────────────────────────────────────────────────────────────────
// Balances are stored in the smallest currency unit (IDR = whole rupiah, no cents).
// We use bigint to safely hold large IDR values without floating-point issues.

export const accounts = pgTable("accounts", {
  id: varchar("id", { length: 32 }).primaryKey(),
  accountNumber: varchar("account_number", { length: 20 }).notNull().unique(),
  accountName: varchar("account_name", { length: 100 }).notNull(),
  productName: varchar("product_name", { length: 100 }).notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("IDR"),
  availableBalance: bigint("available_balance", { mode: "number" })
    .notNull()
    .default(0),
  ledgerBalance: bigint("ledger_balance", { mode: "number" })
    .notNull()
    .default(0),
  minimumBalance: bigint("minimum_balance", { mode: "number" })
    .notNull()
    .default(0),
  status: accountStatusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Cards ────────────────────────────────────────────────────────────────────

export const cards = pgTable("cards", {
  id: varchar("id", { length: 32 }).primaryKey(),
  accountId: varchar("account_id", { length: 32 })
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  cardNumber: varchar("card_number", { length: 24 }).notNull(), // masked
  cardHolder: varchar("card_holder", { length: 100 }).notNull(),
  cardType: cardTypeEnum("card_type").notNull(),
  network: cardNetworkEnum("network").notNull(),
  status: cardStatusEnum("status").notNull().default("active"),
  outstandingBalance: bigint("outstanding_balance", { mode: "number" })
    .notNull()
    .default(0),
  creditLimit: bigint("credit_limit", { mode: "number" }).notNull().default(0),
  availableCredit: bigint("available_credit", { mode: "number" })
    .notNull()
    .default(0),
  paymentDueDate: varchar("payment_due_date", { length: 10 }).default(""), // YYYY-MM-DD or empty
  minimumPayment: bigint("minimum_payment", { mode: "number" })
    .notNull()
    .default(0),
  rewardPoints: bigint("reward_points", { mode: "number" })
    .notNull()
    .default(0),
  rewardTier: varchar("reward_tier", { length: 32 }).notNull().default(""),
  expiryDate: varchar("expiry_date", { length: 5 }).notNull(), // MM/YY
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Transactions ─────────────────────────────────────────────────────────────

export const transactions = pgTable("transactions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  accountId: varchar("account_id", { length: 32 })
    .notNull()
    .references(() => accounts.id, { onDelete: "cascade" }),
  date: timestamp("date", { withTimezone: true }).notNull(),
  valueDate: date("value_date").notNull(),
  amount: bigint("amount", { mode: "number" }).notNull(),
  type: transactionTypeEnum("type").notNull(),
  status: transactionStatusEnum("status").notNull().default("settled"),
  description: text("description").notNull().default(""),
  merchant: varchar("merchant", { length: 100 }),
  category: varchar("category", { length: 64 }).notNull().default(""),
  referenceNumber: varchar("reference_number", { length: 64 }).notNull(),
  balance: bigint("balance", { mode: "number" }).notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type Account = typeof accounts.$inferSelect;
export type NewAccount = typeof accounts.$inferInsert;

export type Card = typeof cards.$inferSelect;
export type NewCard = typeof cards.$inferInsert;

export type Transaction = typeof transactions.$inferSelect;
export type NewTransaction = typeof transactions.$inferInsert;
