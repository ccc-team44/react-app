FROM node:12-alpine as builder

RUN apk --no-cache add \
    g++ \
    make \
    python3

COPY ./package.json /app/react-app/package.json
COPY ./package-lock.json /app/react-app/package-lock.json

RUN cd /app/react-app && \
    npm install

RUN apk --no-cache del \
    g++ \
    make \
    python3

WORKDIR /app/react-app

COPY . /app/react-app/

RUN npm run build

# Stage 2

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/react-app/build /usr/share/nginx/html
