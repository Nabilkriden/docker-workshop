# Use an official Node LTS (alpine for small size)
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (leverages layer cache)
COPY package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy app source
COPY . .

# Expose port and set default command
EXPOSE 3000
CMD ["node", "app.js"]
