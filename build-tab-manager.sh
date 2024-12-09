#!/bin/bash

rm -rf tab-manager-plugin
mkdir ./tab-manager-plugin

npm run build:tabs
cp -a ./dist/apps/tab-manager/* ./tab-manager-plugin
cat ./tab-manager-plugin/runtime.js >> ./tab-manager-plugin/temp-popup.js
cat ./tab-manager-plugin/popup.js >> ./tab-manager-plugin/temp-popup.js
rm ./tab-manager-plugin/popup.js
mv ./tab-manager-plugin/temp-popup.js ./tab-manager-plugin/popup.js
