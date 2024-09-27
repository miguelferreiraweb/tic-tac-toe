# Use an official Node runtime as a parent image
FROM node:20.16-alpine

# Set the default value to 'production', but it's possible to override during docker build.
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set the working directory to /app
WORKDIR /app

# Copy package.json and pnpm-lock.yaml to the WORKDIR/working directoy.
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm i -g pnpm@9.11.0

# Install dependencies
RUN pnpm i --frozen-lockfile --prefer-offline

# Copy the current directory contents into the container at /app
COPY . .

# Disable Next.js telemetry https://nextjs.org/telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
RUN pnpm run build

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Start the Next.js production server
CMD ["pnpm", "start"]
