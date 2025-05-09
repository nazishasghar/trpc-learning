# api docker file
FROM node:22.2.0-bullseye-slim
# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container's working directory
COPY package.json package-lock.json ./

# Copy the configuration files to the /app/config directory inside the container
COPY config ./config/

# Copy the server source code from the host to the /app/src/server directory inside the container
COPY src/server ./src/server/

# Install dependencies and then build the server
RUN npm install && npm run build:server

# Set the environment variable NODE_ENV to production
ENV NODE_ENV=production

# Expose port 3000 to allow access to the server
EXPOSE 3000

# Command to run the server in production mode
CMD [ "npm", "run", "start:prod" ]