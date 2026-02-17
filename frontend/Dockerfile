FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
# Set env for React dev server
ENV HOST=0.0.0.0
ENV PORT=3001

CMD ["npm", "run", "dev"]
