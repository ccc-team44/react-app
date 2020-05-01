# Build Stage

FROM node:13.12.0-alpine as build
WORKDIR /app/react-app
ENV PATH /app/react-app/node_modules/.bin:$PATH

COPY ./package.json ./
COPY ./package-lock.json ./

RUN cd /app/react-app && \
    npm install

COPY . ./
# react app doesn't know where server is, we need to tell it
ARG SERVER_HTTP_ADDRESS
ENV SERVER_HTTP_ADDRESS $SERVER_HTTP_ADDRESS

RUN npm run build



# production environment
FROM nginx:alpine
FROM nginx:stable-alpine
COPY --from=build /app/react-app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
