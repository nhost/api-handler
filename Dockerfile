FROM node:14.15.1-alpine3.10

WORKDIR /usr/src/app
COPY .babelrc install.sh ./
RUN chmod +x install.sh
RUN mkdir src
COPY index.js src/

CMD [ "node" ]
