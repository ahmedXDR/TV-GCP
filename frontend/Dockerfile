# Use an official Node runtime as the base image
FROM node:21

# Set the working directory in the container to /app
WORKDIR /app

# Set environment variables
ARG BACKEND_URL=http://localhost:5000
ARG PORT=3000
ENV VITE_BACKEND_URL=$BACKEND_URL

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle app source by copying the rest of the code
COPY . .

# Make port 3000 available to the outside of the Docker container
EXPOSE $PORT

# Start the app
CMD ["npm", "start"]