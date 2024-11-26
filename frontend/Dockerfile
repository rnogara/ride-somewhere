FROM node:23-alpine3.19

WORKDIR /app-frontend

COPY package*.json ./

RUN npm install

COPY . .

ARG NEXT_PUBLIC_GOOGLE_API_KEY
ENV NEXT_PUBLIC_GOOGLE_API_KEY=$NEXT_PUBLIC_GOOGLE_API_KEY

RUN npm run build

EXPOSE 80

ENTRYPOINT ["npm", "run"]

CMD ["start"]