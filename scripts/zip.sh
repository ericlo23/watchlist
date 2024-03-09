#!/bin/sh

if [ ! -d "dist" ]; then
  mkdir dist
else
  rm -rf dist/*
fi

zip -j "dist/watchlist.zip" build/*
