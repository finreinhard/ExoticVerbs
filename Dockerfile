FROM node:8

# Create directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --only=production

# Bundle
COPY . .

# Start
EXPOSE 8080
CMD [ "npm", "start" ]

