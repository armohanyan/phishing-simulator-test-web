FROM node:22-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

# Start the application
CMD [ "npm", "run", "dev" ]