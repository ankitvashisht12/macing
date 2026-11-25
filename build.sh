#!/bin/bash
set -euo pipefail
cd "$(dirname "$0")"
app="Macing.app"
mkdir -p "$app/Contents/MacOS" "$app/Contents/Resources"
cp Info.plist "$app/Contents/"
cp Resources/* "$app/Contents/Resources/"
swiftc -O main.swift -o "$app/Contents/MacOS/Macing"
codesign --force --sign - "$app"
codesign --verify --strict "$app"
