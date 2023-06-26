FROM node:18-alpine3.17

# Create app directory
WORKDIR /usr/src/app

RUN apk update && apk upgrade \
    && apk --no-cache add tar curl tini bash \
    && apk --no-cache add --virtual devs python3 git openssh make gcc build-base  wget \
    && rm -rf /tmp/npm*

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .

EXPOSE 8080
#CMD [ "npm", "run", "prod" ]
#CMD [ "node", "server.js" ]
ENTRYPOINT node /usr/src/app/server.js


# docker build . -t clemFormation/api-liveaddict
# docker image rm api-liveaddict-node -f && docker build -f Dockerfile -t clem-formation/api-liveaddict --rm --force-rm .
# docker run -it --entrypoint /bin/bash clem-formation/api-liveaddict:latest