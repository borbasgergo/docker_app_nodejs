FROM node:latest

WORKDIR /dock
COPY package*.json ./
RUN npm install
RUN npm install ts-node -g && npm install typescript && npm install pg --save
COPY . .

EXPOSE 8081

CMD ["npm", "run", "dev"]