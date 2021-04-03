FROM node:14

# app directory
WORKDIR /home/david/audio-context-study

# Install app dependencies
COPY package*.json ./

RUN npm install

# bundle app source

COPY . . 

EXPOSE 3000
CMD ["node", "app.js"]

