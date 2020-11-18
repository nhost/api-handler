FROM node:14.15.1-alpine3.10

WORKDIR /usr/src/app
RUN yarn add express node-dir
RUN yarn add -D @babel/core @babel/cli @babel/preset-env @babel/plugin-transform-runtime
COPY .babelrc .
RUN mkdir src
COPY index.js src/

CMD [ "node" ]
