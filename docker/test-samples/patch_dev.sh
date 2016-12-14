#!/bin/sh

set -e

for file in /usr/share/nginx/html/samples/*.html;
do
   sed -i "s|/dev/dist|/dist|g" $file
done
