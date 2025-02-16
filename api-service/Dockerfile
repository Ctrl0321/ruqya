# Step 1: Build stage
FROM node:22 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy the entire source code to the container
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build  # Assuming you have a 'build' script in package.json to compile TypeScript

# Step 2: Runtime stage (production)
FROM node:22 AS runtime

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for production dependencies
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install

# Copy the compiled JavaScript files and other necessary files
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/src /app/src

# Expose the port the app will run on
EXPOSE 5050

# Start the app
CMD ["npm", "run", "start"]
