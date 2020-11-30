#/bin/sh

if [ -f "api/package-lock.json" ]; then
  cp api/package*.json .
  npm install
  npm add express express-async-handler glob morgan nodemon
  npm cache clean --force
else
  cp api/package.json api/yarn.lock . || true
  yarn install || true
  yarn add express express-async-handler glob morgan nodemon
  yarn cache clean
fi