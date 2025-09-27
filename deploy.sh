#!/bin/bash

# UTaskify Deployment Script
echo "🚀 Starting UTaskify deployment..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build for production
echo "🔨 Building for production..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful!"
    echo "📁 Build files are in the 'dist' directory"
    echo "🌐 You can now deploy the 'dist' folder to any static hosting service"
    echo ""
    echo "Deployment options:"
    echo "• Netlify: Drag and drop the 'dist' folder to netlify.com"
    echo "• Vercel: Connect your repo to vercel.com"
    echo "• GitHub Pages: Use 'npm run deploy' (requires gh-pages setup)"
    echo ""
    echo "🔗 For local testing, run: npm run preview"
else
    echo "❌ Build failed! Please check the error messages above."
    exit 1
fi
