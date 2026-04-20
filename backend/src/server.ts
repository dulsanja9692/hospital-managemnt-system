// ──────────────────────────────────────────────────────────────────────────────
// Server Entry Point — starts the HTTP server with graceful shutdown.
//
// Graceful shutdown ensures in-flight requests complete and the
// database connection is properly closed on SIGTERM / SIGINT.
// ──────────────────────────────────────────────────────────────────────────────

import app from './app';
import { config } from './config/index';
import { connectDatabase, disconnectDatabase } from './config/database';
import { logger } from './utils/logger';

const startServer = async (): Promise<void> => {
  // Connect to the database (non-fatal in dev if DB is unavailable)
  try {
    await connectDatabase();
  } catch {
    if (config.isDev) {
      logger.warn('Database connection failed — running without DB (dev mode)');
    } else {
      process.exit(1);
    }
  }

  const server = app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port.toString()}`);
    logger.info(`Environment: ${config.nodeEnv}`);
    logger.info(`Hospital Management System API ready`);
    logger.info(`Health check: http://localhost:${config.port.toString()}/api/v1/health`);
  });

  // ── Graceful Shutdown ──────────────────────────────────────────────────────
  const gracefulShutdown = async (signal: string): Promise<void> => {
    logger.info(`\n${signal} received. Starting graceful shutdown...`);

    server.close(async () => {
      logger.info('HTTP server closed');

      // Disconnect database
      await disconnectDatabase();

      logger.info('Graceful shutdown complete');
      process.exit(0);
    });

    // Force shutdown after 30 seconds
    setTimeout(() => {
      logger.error('Forced shutdown — could not close connections in time');
      process.exit(1);
    }, 30_000);
  };

  process.on('SIGTERM', () => { void gracefulShutdown('SIGTERM'); });
  process.on('SIGINT', () => { void gracefulShutdown('SIGINT'); });

  // Handle unhandled rejections / uncaught exceptions
  process.on('unhandledRejection', (reason: unknown) => {
    logger.error('UNHANDLED REJECTION! Shutting down...', { reason });
    server.close(() => process.exit(1));
  });

  process.on('uncaughtException', (error: Error) => {
    logger.error('UNCAUGHT EXCEPTION! Shutting down...', { error: error.message, stack: error.stack });
    server.close(() => process.exit(1));
  });
};

startServer().catch((error: unknown) => {
  logger.error('Failed to start server', { error });
  process.exit(1);
});
