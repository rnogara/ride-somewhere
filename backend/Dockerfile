FROM node:23-alpine3.19

RUN apk add --no-cache netcat-openbsd

WORKDIR /app-backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD /bin/sh -c "while ! nc -z db 5432; do sleep 2; done; npm run start:dev"
