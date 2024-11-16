# Stage 1: Build the NestJS app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the entire project into the container
COPY . .

# Build the NestJS app (compiles TypeScript to JavaScript)
RUN npm run build

# Stage 2: Production-ready image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist ./dist

# Copy the node_modules folder from the build stage to avoid reinstalling dependencies
COPY --from=build /app/node_modules ./node_modules

# Set the environment variable for production
ENV NODE_ENV=production

# Start the NestJS app
CMD ["node", "dist/main"]
