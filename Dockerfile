FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY ./public ./public/
COPY . .
RUN npm run build

EXPOSE 4173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]