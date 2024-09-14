# Use an official Node.js image as the base
FROM node:latest

# Set the working directory to /app
WORKDIR /frontend

# Copy the package*.json files to the working directory
COPY package*.json ./

# Install the dependencies using npm
RUN npm install

# Copy the application code to the working directory
COPY . .

# Expose the port that the application will use
EXPOSE 5173

# Run the command to start the development server
CMD ["npm", "run" "dev"]