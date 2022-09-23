#!/usr/bin/env zsh

set -e

versionFiles=( "." "libs/core" "libs/material" "libs/material-experimental" )

#jq ".version = \"$1\"" package.json

for i in "${versionFiles[@]}"; do
  packageFile="$i/package.json"
  echo "$packageFile"
  cp "$packageFile" "$packageFile-old"
  jq ".version = \"$1\"" "$packageFile-old" > "$packageFile"
  rm "$packageFile-old"
done
