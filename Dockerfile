# Dockerfile

# Step 1: Use the official Node.js image
FROM node:18-alpine
# Step 2: Set the working directory inside the container
WORKDIR /usr/src/app
# Step 3: Copy package.json and yarn.lock to install dependencies
COPY package.json ./
COPY yarn.lock ./
# Step 4: Install only production dependencies using Yarn
RUN yarn install --production
# Step 5: Copy the rest of the application code into the container
COPY . .
# Step 6: Expose the port (make sure this matches your .env port)
#Change this based on your .esnv file
EXPOSE 5000  
# Step 7: Define the command to run your app
CMD ["yarn", "start"]
