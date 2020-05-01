# Build Stage

FROM node:13.12.0-alpine as build
WORKDIR /app/react-app

COPY . ./

RUN npm install
RUN npm run build



# production environment
FROM nginx:alpine
RUN apk add --no-cache jq
COPY --from=build /app/react-app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
