#!/bin/bash

# Remove-Clean-Install script to properly remove and reinstall all cached dependencies
# Made this script for ease of clean reinstalling dependencies 

# Remove directories
rm -rf .webpack-cache
rm -rf .next
rm -rf node_modules

# Install dependencies
npm ci