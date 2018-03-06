#!/usr/bin/env bash

printf "syncing to Amazon S3...\n"
aws s3 sync ./build s3://nile.babasmg.com/webapp/ \
  --region us-west-2 \
  --exclude ".DS_Store" \
  --delete
printf "done.\n"
