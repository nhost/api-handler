#/bin/sh

if [ -f "api/package-lock.json" ]; then
  cp api/package*.json .
  npm install
  npm install express express-async-handler glob morgan @babel/core @babel/cli @babel/preset-env @babel/polyfill @babel/plugin-transform-runtime @babel/node nodemon
  npm cache clean
else
  cp api/package.json api/yarn.lock . || true
  yarn install || true
  yarn add express express-async-handler glob morgan @babel/core @babel/cli @babel/preset-env @babel/polyfill @babel/plugin-transform-runtime @babel/node nodemon
  yarn cache clean
fi