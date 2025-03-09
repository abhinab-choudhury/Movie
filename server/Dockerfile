# node.js image
FROM node:22-alpine

# set working directory
WORKDIR /usr/src/app

# copy package.json and package-lock.json
COPY package*.json ./
# install dependencies
RUN npm install

# copy reset of the client code
COPY . .
RUN mv .env.example .env

# build the client code
RUN npm run build

# Expose port for the client
EXPOSE 3000

# Start the client 
CMD [ "npm", "run", "dev+" ]
