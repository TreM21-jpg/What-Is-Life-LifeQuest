FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production || npm install --production

# Copy source
COPY . .

ENV PORT=3001
EXPOSE 3001

CMD ["node", "backend/server-enhanced.js"]
