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
