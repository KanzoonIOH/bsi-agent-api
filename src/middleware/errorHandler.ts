import { Request, Response, NextFunction } from "express";

export function notFound(req: Request, res: Response): void {
  res.status(404).json({
    success: false,
    timestamp: new Date().toISOString(),
    error: {
      code: "NOT_FOUND",
      message: `Route ${req.method} ${req.originalUrl} not found.`,
    },
  });
}

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("[ERROR]", err.message);
  res.status(500).json({
    success: false,
    timestamp: new Date().toISOString(),
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred.",
    },
  });
}
