FROM node:12-alpine AS builder
WORKDIR /microservice
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build


# Second Stage : Setup command to run your app using lightweight node image
FROM node:12-alpine
WORKDIR /microservice
COPY --from=builder /microservice ./
EXPOSE 12000
CMD ["npm", "run", "start:prod"]