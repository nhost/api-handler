#!/bin/sh

./node_modules/.bin/tsc -p .
cd dist && node index.js