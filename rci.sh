#!/bin/bash

# Remove-Clean-Install script to properly remove and reinstall all cached dependencies
# Made this script because every time I push/commit to the repo
# I have to manually remove and reinstall all the dependencies and the webcache

# Remove directories
rm -rf .webpack-cache
rm -rf .next
rm -rf node_modules

# Install dependencies
npm ci