#!/bin/bash

# echo "$(pwd)"

# del android data
rm -rf ./android/.gradle && rm -rf ./android/.idea && rm -rf ./android/build

# del ios data
rm -rf ./ios/build && rm -rf ./Pods && rm -rf ./Podfile.lock && rm -rf ${HOME}/Library/Developer/Xcode/DerivedData/*

# del node_modules
rm -rf ./node_modules && rm -rf ./yarn.lock