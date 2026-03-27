// ─── Data Access Layer ────────────────────────────────────────────────────────
// Async Drizzle ORM queries replacing the in-memory seed.ts helpers.
// Routes import from here; swap DB implementation without touching route code.

import { eq, and, gte, lte, desc } from "drizzle-orm";
import { db } from "../db/client";
import { accounts, cards, transactions } from "../db/schema";
import type { Account, Card, Transaction } from "../db/schema";

// ─── Accounts ────────────────────────────────────────────────────────────────

export async function getAccountById(id: string): Promise<Account | undefined> {
  const rows = await db
    .select()
    .from(accounts)
    .where(eq(accounts.id, id))
    .limit(1);
  return rows[0];
}

export async function getAllAccounts(): Promise<Account[]> {
  return db.select().from(accounts);
}

// ─── Cards ────────────────────────────────────────────────────────────────────

export async function getCardById(id: string): Promise<Card | undefined> {
  const rows = await db
    .select()
    .from(cards)
    .where(eq(cards.id, id))
    .limit(1);
  return rows[0];
}

// ─── Transactions ─────────────────────────────────────────────────────────────

export async function getTransactionById(
  id: string
): Promise<Transaction | undefined> {
  const rows = await db
    .select()
    .from(transactions)
    .where(eq(transactions.id, id))
    .limit(1);
  return rows[0];
}

export async function getTransactionsByAccount(
  accountId: string,
  opts: {
    limit?: number;
    from?: string;
    to?: string;
    status?: string;
  } = {}
): Promise<Transaction[]> {
  const conditions = [eq(transactions.accountId, accountId)];

  if (opts.status) {
    conditions.push(
      eq(
        transactions.status,
        opts.status as "settled" | "pending" | "failed"
      )
    );
  }

  if (opts.from) {
    conditions.push(gte(transactions.date, new Date(opts.from)));
  }

  if (opts.to) {
    // End of day
    const to = new Date(opts.to);
    to.setHours(23, 59, 59, 999);
    conditions.push(lte(transactions.date, to));
  }

  const query = db
    .select()
    .from(transactions)
    .where(and(...conditions))
    .orderBy(desc(transactions.date))
    .limit(opts.limit ?? 10);

  return query;
}

export type { Account, Card, Transaction };
