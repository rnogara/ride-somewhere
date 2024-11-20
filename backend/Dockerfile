FROM node:23-alpine3.19

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

ENTRYPOINT ["npm", "run"]

CMD ["start"]