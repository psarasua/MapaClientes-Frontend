#!/bin/bash

echo "Starting Railway deployment..."

# Build the application
echo "Building application..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "Build failed!"
    exit 1
fi

echo "Build successful, starting preview server..."

# Start the preview server
npm run preview
