FROM node:18-slim

WORKDIR /app

RUN apt-get update && apt-get install -y build-essential python3 sqlite3

COPY package*.json ./
RUN npm install --build-from-source

COPY . .

ENV PORT=8080
EXPOSE 8080

CMD ["node", "app.js"]
