#!/bin/sh

ZIP_FILE=$(ls dist/watchlist.zip | head -n 1)

if [ -z "$ZIP_FILE" ]; then
  echo "cannot find any zip file in dist directory"
  exit 1
else
  echo "uploading $ZIP_FILE to S3"
  aws s3 cp "$ZIP_FILE" "s3://watchlist-bundle/" --profile mine
fi
