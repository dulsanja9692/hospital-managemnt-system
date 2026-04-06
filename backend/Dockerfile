# ──────────────────────────────────────────────────────────────────────────────
# Dockerfile — Multi-stage build for Hospital Management System API
#
# Stage 1 (builder): Install deps + compile TypeScript
# Stage 2 (prod):    Slim Alpine image, non-root user, only production deps
# ──────────────────────────────────────────────────────────────────────────────

# ── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# 1. Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# 2. Install dependencies
RUN npm install

# 3. Generate Prisma client
RUN npx prisma generate

# 4. Copy EVERYTHING else (src, tsconfig, etc.)
# This replaces the broken "COPY backend" lines
COPY ./package.json ./
COPY . .

# 5. Build TypeScript
RUN npm run build

# ── Stage 2: Production ──────────────────────────────────────────────────────
FROM node:20-alpine AS production

RUN addgroup -g 1001 -S appgroup && \
  adduser -S appuser -u 1001 -G appgroup

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install --omit=dev && \
  npx prisma generate && \
  npm cache clean --force

# Copy compiled code from builder
COPY --from=builder /app/dist ./dist

RUN mkdir -p logs && chown -R appuser:appgroup /app

USER appuser
EXPOSE 5000

CMD ["node", "dist/server.js"]