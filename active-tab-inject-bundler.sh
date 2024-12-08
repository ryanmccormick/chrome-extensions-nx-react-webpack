#!/bin/bash

rm -rf focus-mode
npm run clean
npm run build:tab
mkdir focus-mode
cp -a ./dist/apps/active-tab-inject/* ./focus-mode
find ./focus-mode -maxdepth 1 -name "runtime*" -exec cat {} >> ./focus-mode/tempbg.js \;
find ./focus-mode -maxdepth 1 -name "background*" -exec cat {} >> ./focus-mode/tempbg.js \;
mv ./focus-mode/tempbg.js ./focus-mode/focus-mode-background.js

