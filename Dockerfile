# Base image to use
FROM node:latest

# Create application directory
WORKDIR /usr/src/app

# Install application dependedncies
# Copy across project configuration information
COPY package*.json ./

# Request npm to install the dependencies
RUN npm install
# Copy across all our files
COPY . .

# Expose our application port (3000)
EXPOSE 3000

# On start, run the application using npm
ENTRYPOINT ["npm", "start"]

# docker run --rm groupx-project