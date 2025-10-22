# ---- Backend Dockerfile (fixed for CI) ----
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Use npm ci if lockfile exists, else fallback to npm install
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

COPY . .

EXPOSE 4000
CMD ["node", "src/index.js"]
