#!/bin/bash

rm -rf omnibox-dock
npm run clean
npm run build:dock

cp -a ./dist/apps/omnibox-dock .
cat ./omnibox-dock/runtime.js >> ./omnibox-dock/tempcontent.js
cat ./omnibox-dock/content.js >> ./omnibox-dock/tempcontent.js
rm ./omnibox-dock/content.js
mv ./omnibox-dock/tempcontent.js ./omnibox-dock/content.js

