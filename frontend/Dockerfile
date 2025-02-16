# Step 1: Set the base image
FROM node:22-alpine AS builder

# Step 2: Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .


# Step 2: Set the runtime image
FROM node:22-alpine AS runtime

WORKDIR /app

# Copy only the necessary build files from the builder stage
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/package.json /app/package-lock.json /app/

# Install only the production dependencies
RUN npm install

# Step 6: Expose port (default for Next.js)
EXPOSE 3000

# Step 7: Start the Next.js app
CMD ["npm", "start"]
