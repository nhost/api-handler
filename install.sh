#/bin/sh

if [ -f "./package-lock.json" ]; then
  npm install
  npm add express express-async-handler glob morgan @babel/core @babel/cli @babel/preset-env @babel/polyfill @babel/plugin-transform-runtime @babel/node nodemon
else
  yarn install
  yarn add express express-async-handler glob morgan @babel/core @babel/cli @babel/preset-env @babel/polyfill @babel/plugin-transform-runtime @babel/node nodemon
fi