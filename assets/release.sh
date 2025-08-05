#!/bin/bash

start=$(date +%s) # Record start time

echo "============================================="
echo "🚀 Starting [BUILD / RELEASE] process..."
echo "============================================="

echo ""
echo "---------------------"
echo "1. Build new version"
echo "---------------------"

CURRENT_VERSION=$(npm pkg get version --workspaces=false | tr -d \")

echo "Update from $CURRENT_VERSION to " && npm version patch &&
npm run build

NEW_VERSION=$(npm pkg get version --workspaces=false | tr -d \")

echo ""
echo "----------------------------------------"
echo "2. Commit and push new version: $NEW_VERSION"
echo "----------------------------------------"

cd .. &&
git add . &&
git commit -m"release: $NEW_VERSION" &&
git push
cd assets

end=$(date +%s) # Record end time
runtime=$((end - start)) # Calculate runtime

echo "=================================="
echo "✅ Build completed in $runtime seconds."
echo "=================================="
