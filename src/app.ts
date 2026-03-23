import express from "express";
import { authMiddleware } from "./middleware/auth";
import { requestLogger } from "./middleware/logger";
import { notFound, errorHandler } from "./middleware/errorHandler";
import accountsRouter from "./routes/accounts";
import cardsRouter from "./routes/cards";
import transactionsRouter from "./routes/transactions";

const app = express();

// ─── Global Middleware ────────────────────────────────────────────────────────
app.use(express.json());
app.use(requestLogger);

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    data: {
      service: "bsi-agent-api",
      version: "1.0.0",
      status: "healthy",
      authMode: process.env.ENABLE_AUTH === "true" ? "enabled" : "passthrough",
    },
  });
});

// ─── Protected Routes ─────────────────────────────────────────────────────────
app.use("/api/v1/accounts", authMiddleware, accountsRouter);
app.use("/api/v1/cards", authMiddleware, cardsRouter);
app.use("/api/v1/transactions", authMiddleware, transactionsRouter);

// ─── Error Handling ───────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
