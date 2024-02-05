#!/bin/sh
echo "Pre-build steps:::"
echo "Authenticating with AWS ECR..."
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin https://916716665910.dkr.ecr.us-east-1.amazonaws.com

echo "Build steps:::"
echo "Building image..."
docker build -t 916716665910.dkr.ecr.us-east-1.amazonaws.com/suda-frontend-ecr-2 . --no-cache


echo "Post build steps:::"
echo "Pushing image to AWS ECR..."
docker push 916716665910.dkr.ecr.us-east-1.amazonaws.com/suda-frontend-ecr-2