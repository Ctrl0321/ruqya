# Step 1: Set the base image
FROM node:22-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Step 4: Copy the rest of the application files
COPY . .

# Step 5: Build the Next.js app
RUN npm run build

# Step 6: Expose port (default for Next.js)
EXPOSE 3000

# Step 7: Start the Next.js app
CMD ["npm", "start"]
