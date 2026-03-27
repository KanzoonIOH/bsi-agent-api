// ─── Drizzle DB Client ────────────────────────────────────────────────────────
// Single shared instance used across the whole application.
// Reads DATABASE_URL from the environment (set in .env or docker-compose).

import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// `postgres-js` connection pool — max 10 connections by default
const queryClient = postgres(connectionString);

export const db = drizzle(queryClient, { schema });
export type DB = typeof db;
