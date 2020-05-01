# Build Stage

FROM node:13.12.0-alpine as build
WORKDIR /app/react-app

COPY . ./

RUN npm install

# react app doesn't know where server is, we need to tell it
ARG SERVER_HTTP_ADDRESS
ENV SERVER_HTTP_ADDRESS $SERVER_HTTP_ADDRESS

RUN npm run build



# production environment
FROM nginx:alpine
FROM nginx:stable-alpine
#COPY --from=build /app/react-app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
