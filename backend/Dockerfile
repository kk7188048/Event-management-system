# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:latest

# Set the working directory.
WORKDIR /backend

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application code.
COPY . .

# Expose the port the app runs on.
EXPOSE 3000

# Command to run the app.
CMD ["npm", "run", "dev"]
