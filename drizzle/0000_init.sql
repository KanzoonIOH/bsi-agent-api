CREATE TYPE "public"."account_status" AS ENUM('active', 'dormant', 'closed');--> statement-breakpoint
CREATE TYPE "public"."card_network" AS ENUM('Visa', 'Mastercard', 'GPN');--> statement-breakpoint
CREATE TYPE "public"."card_status" AS ENUM('active', 'blocked', 'expired', 'pending_activation');--> statement-breakpoint
CREATE TYPE "public"."card_type" AS ENUM('debit', 'credit');--> statement-breakpoint
CREATE TYPE "public"."transaction_status" AS ENUM('settled', 'pending', 'failed');--> statement-breakpoint
CREATE TYPE "public"."transaction_type" AS ENUM('debit', 'credit');--> statement-breakpoint
CREATE TABLE "accounts" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"account_number" varchar(20) NOT NULL,
	"account_name" varchar(100) NOT NULL,
	"product_name" varchar(100) NOT NULL,
	"currency" varchar(3) DEFAULT 'IDR' NOT NULL,
	"available_balance" bigint DEFAULT 0 NOT NULL,
	"ledger_balance" bigint DEFAULT 0 NOT NULL,
	"minimum_balance" bigint DEFAULT 0 NOT NULL,
	"status" "account_status" DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "accounts_account_number_unique" UNIQUE("account_number")
);
--> statement-breakpoint
CREATE TABLE "cards" (
	"id" varchar(32) PRIMARY KEY NOT NULL,
	"account_id" varchar(32) NOT NULL,
	"card_number" varchar(24) NOT NULL,
	"card_holder" varchar(100) NOT NULL,
	"card_type" "card_type" NOT NULL,
	"network" "card_network" NOT NULL,
	"status" "card_status" DEFAULT 'active' NOT NULL,
	"outstanding_balance" bigint DEFAULT 0 NOT NULL,
	"credit_limit" bigint DEFAULT 0 NOT NULL,
	"available_credit" bigint DEFAULT 0 NOT NULL,
	"payment_due_date" varchar(10) DEFAULT '',
	"minimum_payment" bigint DEFAULT 0 NOT NULL,
	"reward_points" bigint DEFAULT 0 NOT NULL,
	"reward_tier" varchar(32) DEFAULT '' NOT NULL,
	"expiry_date" varchar(5) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"account_id" varchar(32) NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"value_date" date NOT NULL,
	"amount" bigint NOT NULL,
	"type" "transaction_type" NOT NULL,
	"status" "transaction_status" DEFAULT 'settled' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"merchant" varchar(100),
	"category" varchar(64) DEFAULT '' NOT NULL,
	"reference_number" varchar(64) NOT NULL,
	"balance" bigint DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_account_id_accounts_id_fk" FOREIGN KEY ("account_id") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;