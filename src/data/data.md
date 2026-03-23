# BSI Mock Seed Data

## Accounts

| ID     | Account Number  | Account Name          | Product Name                  | Currency | Available Balance | Ledger Balance | Minimum Balance | Status |
|--------|-----------------|-----------------------|-------------------------------|----------|------------------:|---------------:|----------------:|--------|
| ACC001 | 7150081234567   | Ahmad Faruq Ramadhan  | BSI Tabungan Easy Mudharabah  | IDR      |        12,450,000 |     12,450,000 |          50,000 | active |
| ACC002 | 7150089876543   | Ahmad Faruq Ramadhan  | BSI Tabungan Haji             | IDR      |        38,200,000 |     38,200,000 |         500,000 | active |
| ACC003 | 7150085544332   | Ahmad Faruq Ramadhan  | BSI Giro Wadiah               | IDR      |         5,000,000 |      5,125,000 |       1,000,000 | active |

---

## Cards

| ID      | Account | Card Number          | Card Holder            | Type   | Network    | Status             | Outstanding Balance | Credit Limit | Available Credit | Payment Due | Min Payment | Reward Points | Reward Tier | Expiry |
|---------|---------|----------------------|------------------------|--------|------------|--------------------|--------------------:|-------------:|-----------------:|-------------|------------:|--------------:|-------------|--------|
| CARD001 | ACC001  | 4521 **** **** 3847  | AHMAD FARUQ RAMADHAN   | debit  | Visa       | active             |                   0 |            0 |                0 | —           |           0 |         4,820 | BSI Silver  | 12/27  |
| CARD002 | ACC001  | 5341 **** **** 9012  | AHMAD FARUQ RAMADHAN   | credit | Mastercard | active             |           3,750,000 |   15,000,000 |       11,250,000 | 2026-04-10  |       375,000 |        12,540 | BSI Gold    | 09/28  |
| CARD003 | ACC002  | 4521 **** **** 2201  | AHMAD FARUQ RAMADHAN   | debit  | GPN        | pending_activation |                   0 |            0 |                0 | —           |           0 |             0 | BSI Silver  | 03/29  |

---

## Transactions

| ID               | Account | Date                      | Value Date | Amount    | Type   | Status  | Description                       | Merchant        | Category         | Reference              | Balance    |
|------------------|---------|---------------------------|------------|----------:|--------|---------|-----------------------------------|-----------------|------------------|------------------------|-----------:|
| TXN20260323001   | ACC001  | 2026-03-23 08:30 WIB      | 2026-03-23 |   450,000 | debit  | pending | Shopee Pay - Belanja Fashion      | Shopee          | E-Commerce       | BSI202603230001100     | 12,000,000 |
| TXN20260323002   | ACC001  | 2026-03-23 07:15 WIB      | 2026-03-23 |   120,000 | debit  | pending | Pertamina - Isi Bensin            | Pertamina       | Transportation   | BSI202603230000987     | 12,450,000 |
| TXN20260320001   | ACC001  | 2026-03-20 09:15 WIB      | 2026-03-20 |   250,000 | debit  | settled | Transfer ke Siti Rahayu           | —               | Transfer         | BSI202603200011234     | 12,700,000 |
| TXN20260319001   | ACC001  | 2026-03-19 14:32 WIB      | 2026-03-19 |    85,000 | debit  | settled | Pembayaran QRIS - Warung Bu Haji  | Warung Bu Haji  | Food & Beverage  | BSI202603190024455     | 12,950,000 |
| TXN20260319002   | ACC001  | 2026-03-19 08:00 WIB      | 2026-03-19 | 5,000,000 | credit | settled | Gaji - PT Indosat Tbk             | —               | Salary           | BSI202603190010001     | 13,035,000 |
| TXN20260318001   | ACC001  | 2026-03-18 20:10 WIB      | 2026-03-18 |   350,000 | debit  | settled | Tokopedia - Pembelian Online      | Tokopedia       | E-Commerce       | BSI202603180037788     |  8,035,000 |
| TXN20260318002   | ACC001  | 2026-03-18 11:45 WIB      | 2026-03-18 |   150,000 | debit  | settled | Tagihan PLN Prabayar              | PLN             | Utilities        | BSI202603180021122     |  8,385,000 |
| TXN20260317001   | ACC001  | 2026-03-17 16:05 WIB      | 2026-03-17 | 1,200,000 | debit  | settled | ATM Tarik Tunai - BSI KCP Sudirman| —               | Cash Withdrawal  | BSI202603170045566     |  8,535,000 |
| TXN20260316001   | ACC001  | 2026-03-16 10:22 WIB      | 2026-03-16 |   200,000 | debit  | settled | GrabFood - Makan Siang            | GrabFood        | Food & Beverage  | BSI202603160019900     |  9,735,000 |
| TXN20260315001   | ACC001  | 2026-03-15 09:00 WIB      | 2026-03-15 |   500,000 | credit | settled | Transfer Masuk - Budi Santoso     | —               | Transfer         | BSI202603150033344     |  9,935,000 |
| TXN20260310001   | ACC002  | 2026-03-10 10:00 WIB      | 2026-03-10 | 2,000,000 | credit | settled | Setoran Tabungan Haji - Mandiri   | —               | Savings          | BSI202603100012233     | 38,200,000 |
