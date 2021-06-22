#!/bin/sh

if [ -f "api/package-lock.json" ]; then
  cp api/package*.json .
  npm install
  npm add express express-async-handler glob morgan
  npm add --save-dev @types/express @types/glob @types/morgan@1.9.0 @types/node nodemon ts-node typescript
  npm cache clean --force
else
  cp api/package.json api/yarn.lock . || true
  yarn install || true
  yarn add express express-async-handler glob morgan
  yarn add -D @types/express @types/glob @types/morgan@1.9.0 @types/node nodemon ts-node typescript
  yarn cache clean
fi

./node_modules/.bin/nodemon --watch 'api/**/*' --ext 'js,ts,json' --ignore 'api/**/*.spec.ts' --ignore 'api/node_modules' --exec './node_modules/.bin/ts-node' index.ts
