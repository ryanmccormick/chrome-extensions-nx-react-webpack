#!/bin/bash

rm -rf multi-bundle
npm run clean
npm run build && npm run build:multi

mkdir multi-bundle
cp -a ./dist/apps/plugin-demo/* ./multi-bundle

