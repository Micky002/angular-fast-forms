#!/usr/bin/env zsh

set -e

versionFiles=( "libs/core" "libs/material" "libs/material-experimental" )

version=$(jq -r .version package.json)
echo "Set version to $version"

for i in "${versionFiles[@]}"; do
  packageFile="$i/package.json"
  echo "Update '$packageFile'"
  cp "$packageFile" "$packageFile-old"
  jq ".version = \"$version\"" "$packageFile-old" > "$packageFile"
  rm "$packageFile-old"
done
