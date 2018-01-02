printf "syncing to Amazon S3...\n"
aws s3 sync ./ s3://nile.babasmg.com \
  --region us-west-2 \
  --exclude ".git/*" \
  --exclude ".DS_Store" \
  --exclude "deploy.sh" \
  --delete
printf "done.\n"
