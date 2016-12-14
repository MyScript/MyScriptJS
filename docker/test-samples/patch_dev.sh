#!/bin/sh

set -e

for file in /usr/share/nginx/html/*.html;
do
   sed -i "s|/dev/dist|/dist|g" $file
done
