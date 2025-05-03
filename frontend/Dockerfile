# Stage 1: Build the application
FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm install -g pnpm

RUN pnpm install

# Set environment variables for build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm run build

# Stage 2: Run the application
FROM node:alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from the builder stage
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Expose the port the app will run on
EXPOSE 3001

# Start the application
CMD ["npm", "start"]