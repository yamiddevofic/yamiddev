#!/bin/bash

# Remove existing dist directory if it exists
echo "Removing existing dist directory..."
rm -rf dist/

# Run build command
echo "Building new distribution..."
npm run build

# Verify build success
if [ $? -eq 0 ]; then
    echo "Build completed successfully!"
else
    echo "Build failed!"
    exit 1
fi

echo "Deployment process completed!"

# Deploy to main branch
echo "Deploying to main branch..."
git add dist
git commit -m "Build: New distribution files"
git push origin main

if [ $? -eq 0 ]; then
    echo "Deployment successful!"
else
    echo "Deployment failed!"
    exit 1
fi