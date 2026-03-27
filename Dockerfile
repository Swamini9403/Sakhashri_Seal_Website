# PRODUCTION READY SINGLE DOCKERFILE FOR SAKHASHRI SEALS CORPORATION
# Combines both Frontend (Static) and Backend (Node.js)

FROM node:18-alpine

# Set working directory for the whole app
WORKDIR /app

# Copy the backend dependency files first (for caching)
COPY backend/package*.json ./backend/

# Install only production dependencies for the backend
WORKDIR /app/backend
RUN npm install --omit=dev

# Return to app root
WORKDIR /app

# Copy all the important project code:
# Frontend assets
COPY Website/ ./Website/
COPY Style/ ./Style/
COPY Script/ ./Script/
COPY assets/ ./assets/

# Backend code
COPY backend/ ./backend/

# Expose port 3000 (both frontend and backend)
EXPOSE 3000

# Start the unified server
WORKDIR /app/backend
CMD ["node", "server.js"]
