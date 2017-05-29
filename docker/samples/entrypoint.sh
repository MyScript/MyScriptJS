#!/bin/sh

set -e

echo "Running nginx"
echo "========================"
echo "APIHOST=${APIHOST}"
echo "APPLICATIONKEY=${APPLICATIONKEY}"
echo "HMACKEY=${HMACKEY}"

for filename in /usr/share/nginx/html/samples/**/*.html; do
    sed -i "s/localhost:8897/${APIHOST}/g" "${filename}"
    sed -i "s/webdemoapi.myscript.com/${APIHOST}/g" "${filename}"
    sed -i "s/newcloud.myscript.com/${APIHOST}/g" "${filename}"
    sed -i "s/515131ab-35fa-411c-bb4d-3917e00faf60/${APPLICATIONKEY}/g" "${filename}"
    sed -i "s/7d223f9e-a3cb-4213-ba4b-85e930605f8b/${APPLICATIONKEY}/g" "${filename}"
    sed -i "s/54b2ca8a-6752-469d-87dd-553bb450e9ad/${HMACKEY}/g" "${filename}"
    sed -i "s/5ab1935e-529a-4d48-a695-158450e52b13/${HMACKEY}/g" "${filename}"
done

nginx
