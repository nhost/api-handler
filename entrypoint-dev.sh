#!/bin/sh

./node_modules/.bin/nodemon --watch 'api/**/*' --ext 'js,ts,json' --ignore 'api/**/*.spec.ts' --ignore 'api/node_modules' --exec './node_modules/.bin/ts-node' index.ts