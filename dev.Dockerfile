FROM node:12-alpine

RUN apk --no-cache add \
    g++ \
    make \
    python3

COPY ./package.json /app/react-app/package.json
COPY ./package-lock.json /app/react-app/package-lock.json

# RUN cd /app/react-app && \
#     npm install

# RUN apk --no-cache del \
#     g++ \
#     make \
#     python3

WORKDIR /app/react-app

EXPOSE 3000
