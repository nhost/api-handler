FROM node:14.15.1-alpine3.12

WORKDIR /usr/src/app
COPY tsconfig.json install.sh entrypoint-dev.sh entrypoint-cli.sh entrypoint-prod.sh index.ts ./
RUN chmod +x install.sh entrypoint-dev.sh entrypoint-prod.sh

# RUN yarn cache express express-async-handler glob morgan @babel/core @babel/cli @babel/preset-env @babel/polyfill @babel/plugin-transform-runtime @babel/node nodemon
# RUN npm cache express express-async-handler glob morgan @babel/core @babel/cli @babel/preset-env @babel/polyfill @babel/plugin-transform-runtime @babel/node nodemon

CMD [ "node" ]
