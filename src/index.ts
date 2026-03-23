import app from "./app";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;

app.listen(PORT, () => {
  console.log("─────────────────────────────────────────");
  console.log("  BSI Agent API");
  console.log(`  Running on http://localhost:${PORT}`);
  console.log(`  Auth mode: ${process.env.ENABLE_AUTH === "true" ? "ENABLED (JWT)" : "PASSTHROUGH (demo)"}`);
  console.log("─────────────────────────────────────────");
  console.log("  Endpoints:");
  console.log("  GET /health");
  console.log("  GET /api/v1/accounts/summary");
  console.log("  GET /api/v1/accounts/:id/balance");
  console.log("  GET /api/v1/accounts/:id/transactions");
  console.log("  GET /api/v1/cards/:id/balance");
  console.log("  GET /api/v1/cards/:id/limit");
  console.log("  GET /api/v1/cards/:id/billing");
  console.log("  GET /api/v1/cards/:id/rewards");
  console.log("  GET /api/v1/cards/:id/status");
  console.log("  GET /api/v1/transactions/:txn_id");
  console.log("─────────────────────────────────────────");
});
