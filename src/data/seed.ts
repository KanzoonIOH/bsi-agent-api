// ─── BSI Mock Seed Data ───────────────────────────────────────────────────────
// Realistic mock data modeled after Bank Syariah Indonesia (BSI)
// Replace data access functions with real DB calls when ready.

export interface Account {
  id: string;
  accountNumber: string;
  accountName: string;
  productName: string;
  currency: string;
  availableBalance: number;
  ledgerBalance: number;
  minimumBalance: number;
  status: "active" | "dormant" | "closed";
}

export interface Card {
  id: string;
  accountId: string;
  cardNumber: string; // masked
  cardHolder: string;
  cardType: "debit" | "credit";
  network: "Visa" | "Mastercard" | "GPN";
  status: "active" | "blocked" | "expired" | "pending_activation";
  outstandingBalance: number;
  creditLimit: number;
  availableCredit: number;
  paymentDueDate: string;
  minimumPayment: number;
  rewardPoints: number;
  rewardTier: string;
  expiryDate: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  date: string;
  valueDate: string;
  amount: number;
  type: "debit" | "credit";
  status: "settled" | "pending" | "failed";
  description: string;
  merchant: string | null;
  category: string;
  referenceNumber: string;
  balance: number;
}

// ─── Accounts ────────────────────────────────────────────────────────────────

export const accounts: Account[] = [
  {
    id: "ACC001",
    accountNumber: "7150081234567",
    accountName: "Ahmad Faruq Ramadhan",
    productName: "BSI Tabungan Easy Mudharabah",
    currency: "IDR",
    availableBalance: 12_450_000,
    ledgerBalance: 12_450_000,
    minimumBalance: 50_000,
    status: "active",
  },
  {
    id: "ACC002",
    accountNumber: "7150089876543",
    accountName: "Ahmad Faruq Ramadhan",
    productName: "BSI Tabungan Haji",
    currency: "IDR",
    availableBalance: 38_200_000,
    ledgerBalance: 38_200_000,
    minimumBalance: 500_000,
    status: "active",
  },
  {
    id: "ACC003",
    accountNumber: "7150085544332",
    accountName: "Ahmad Faruq Ramadhan",
    productName: "BSI Giro Wadiah",
    currency: "IDR",
    availableBalance: 5_000_000,
    ledgerBalance: 5_125_000,
    minimumBalance: 1_000_000,
    status: "active",
  },
];

// ─── Cards ───────────────────────────────────────────────────────────────────

export const cards: Card[] = [
  {
    id: "CARD001",
    accountId: "ACC001",
    cardNumber: "4521 **** **** 3847",
    cardHolder: "AHMAD FARUQ RAMADHAN",
    cardType: "debit",
    network: "Visa",
    status: "active",
    outstandingBalance: 0,
    creditLimit: 0,
    availableCredit: 0,
    paymentDueDate: "",
    minimumPayment: 0,
    rewardPoints: 4_820,
    rewardTier: "BSI Silver",
    expiryDate: "12/27",
  },
  {
    id: "CARD002",
    accountId: "ACC001",
    cardNumber: "5341 **** **** 9012",
    cardHolder: "AHMAD FARUQ RAMADHAN",
    cardType: "credit",
    network: "Mastercard",
    status: "active",
    outstandingBalance: 3_750_000,
    creditLimit: 15_000_000,
    availableCredit: 11_250_000,
    paymentDueDate: "2026-04-10",
    minimumPayment: 375_000,
    rewardPoints: 12_540,
    rewardTier: "BSI Gold",
    expiryDate: "09/28",
  },
  {
    id: "CARD003",
    accountId: "ACC002",
    cardNumber: "4521 **** **** 2201",
    cardHolder: "AHMAD FARUQ RAMADHAN",
    cardType: "debit",
    network: "GPN",
    status: "pending_activation",
    outstandingBalance: 0,
    creditLimit: 0,
    availableCredit: 0,
    paymentDueDate: "",
    minimumPayment: 0,
    rewardPoints: 0,
    rewardTier: "BSI Silver",
    expiryDate: "03/29",
  },
];

// ─── Transactions ─────────────────────────────────────────────────────────────

export const transactions: Transaction[] = [
  {
    id: "TXN20260320001",
    accountId: "ACC001",
    date: "2026-03-20T09:15:00+07:00",
    valueDate: "2026-03-20",
    amount: 250_000,
    type: "debit",
    status: "settled",
    description: "Transfer ke Siti Rahayu",
    merchant: null,
    category: "Transfer",
    referenceNumber: "BSI202603200011234",
    balance: 12_700_000,
  },
  {
    id: "TXN20260319001",
    accountId: "ACC001",
    date: "2026-03-19T14:32:00+07:00",
    valueDate: "2026-03-19",
    amount: 85_000,
    type: "debit",
    status: "settled",
    description: "Pembayaran QRIS - Warung Bu Haji",
    merchant: "Warung Bu Haji",
    category: "Food & Beverage",
    referenceNumber: "BSI202603190024455",
    balance: 12_950_000,
  },
  {
    id: "TXN20260319002",
    accountId: "ACC001",
    date: "2026-03-19T08:00:00+07:00",
    valueDate: "2026-03-19",
    amount: 5_000_000,
    type: "credit",
    status: "settled",
    description: "Gaji - PT Indosat Tbk",
    merchant: null,
    category: "Salary",
    referenceNumber: "BSI202603190010001",
    balance: 13_035_000,
  },
  {
    id: "TXN20260318001",
    accountId: "ACC001",
    date: "2026-03-18T20:10:00+07:00",
    valueDate: "2026-03-18",
    amount: 350_000,
    type: "debit",
    status: "settled",
    description: "Tokopedia - Pembelian Online",
    merchant: "Tokopedia",
    category: "E-Commerce",
    referenceNumber: "BSI202603180037788",
    balance: 8_035_000,
  },
  {
    id: "TXN20260318002",
    accountId: "ACC001",
    date: "2026-03-18T11:45:00+07:00",
    valueDate: "2026-03-18",
    amount: 150_000,
    type: "debit",
    status: "settled",
    description: "Tagihan PLN Prabayar",
    merchant: "PLN",
    category: "Utilities",
    referenceNumber: "BSI202603180021122",
    balance: 8_385_000,
  },
  {
    id: "TXN20260317001",
    accountId: "ACC001",
    date: "2026-03-17T16:05:00+07:00",
    valueDate: "2026-03-17",
    amount: 1_200_000,
    type: "debit",
    status: "settled",
    description: "ATM Tarik Tunai - BSI KCP Sudirman",
    merchant: null,
    category: "Cash Withdrawal",
    referenceNumber: "BSI202603170045566",
    balance: 8_535_000,
  },
  {
    id: "TXN20260316001",
    accountId: "ACC001",
    date: "2026-03-16T10:22:00+07:00",
    valueDate: "2026-03-16",
    amount: 200_000,
    type: "debit",
    status: "settled",
    description: "GrabFood - Makan Siang",
    merchant: "GrabFood",
    category: "Food & Beverage",
    referenceNumber: "BSI202603160019900",
    balance: 9_735_000,
  },
  {
    id: "TXN20260315001",
    accountId: "ACC001",
    date: "2026-03-15T09:00:00+07:00",
    valueDate: "2026-03-15",
    amount: 500_000,
    type: "credit",
    status: "settled",
    description: "Transfer Masuk - Budi Santoso",
    merchant: null,
    category: "Transfer",
    referenceNumber: "BSI202603150033344",
    balance: 9_935_000,
  },
  // Pending transactions
  {
    id: "TXN20260323001",
    accountId: "ACC001",
    date: "2026-03-23T08:30:00+07:00",
    valueDate: "2026-03-23",
    amount: 450_000,
    type: "debit",
    status: "pending",
    description: "Shopee Pay - Belanja Fashion",
    merchant: "Shopee",
    category: "E-Commerce",
    referenceNumber: "BSI202603230001100",
    balance: 12_000_000,
  },
  {
    id: "TXN20260323002",
    accountId: "ACC001",
    date: "2026-03-23T07:15:00+07:00",
    valueDate: "2026-03-23",
    amount: 120_000,
    type: "debit",
    status: "pending",
    description: "Pertamina - Isi Bensin",
    merchant: "Pertamina",
    category: "Transportation",
    referenceNumber: "BSI202603230000987",
    balance: 12_450_000,
  },
  // ACC002 transactions
  {
    id: "TXN20260310001",
    accountId: "ACC002",
    date: "2026-03-10T10:00:00+07:00",
    valueDate: "2026-03-10",
    amount: 2_000_000,
    type: "credit",
    status: "settled",
    description: "Setoran Tabungan Haji - Mandiri",
    merchant: null,
    category: "Savings",
    referenceNumber: "BSI202603100012233",
    balance: 38_200_000,
  },
];

// ─── Data Access Helpers ──────────────────────────────────────────────────────
// These functions are the DB abstraction layer.
// Replace with real DB queries (e.g. Prisma, Knex) when ready.

export function getAccountById(id: string): Account | undefined {
  return accounts.find((a) => a.id === id);
}

export function getAllAccounts(): Account[] {
  return accounts;
}

export function getCardById(id: string): Card | undefined {
  return cards.find((c) => c.id === id);
}

export function getTransactionById(id: string): Transaction | undefined {
  return transactions.find((t) => t.id === id);
}

export function getTransactionsByAccount(
  accountId: string,
  opts: {
    limit?: number;
    from?: string;
    to?: string;
    status?: string;
  } = {}
): Transaction[] {
  let result = transactions.filter((t) => t.accountId === accountId);

  if (opts.status) {
    result = result.filter((t) => t.status === opts.status);
  }

  if (opts.from) {
    const from = new Date(opts.from);
    result = result.filter((t) => new Date(t.date) >= from);
  }

  if (opts.to) {
    const to = new Date(opts.to);
    // set to end of day
    to.setHours(23, 59, 59, 999);
    result = result.filter((t) => new Date(t.date) <= to);
  }

  // Sort newest first
  result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (opts.limit) {
    result = result.slice(0, opts.limit);
  }

  return result;
}
