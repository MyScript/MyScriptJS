#!/bin/sh

set -e

echo "Running nginx"
echo "========================"
echo "LISTEN_PORT=>>${LISTEN_PORT}<<"
echo "CDK_APIHOST=${CDK_APIHOST}"
echo "CDK_APPLICATIONKEY=${CDK_APPLICATIONKEY}"
echo "CDK_HMACKEY=${CDK_HMACKEY}"
echo "CDK_APISCHEME=${CDK_APISCHEME}"
echo "IINK_APIHOST=${IINK_APIHOST}"
echo "IINK_APPLICATIONKEY=${IINK_APPLICATIONKEY}"
echo "IINK_HMACKEY=${IINK_HMACKEY}"
echo "IINK_APISCHEME=${IINK_APISCHEME}"

sed -i -e "s/\(listen\s\+\)\(80;\)/\1${LISTEN_PORT};/g"  /etc/nginx/conf.d/default.conf
cat /etc/nginx/conf.d/default.conf

for filename in /usr/share/nginx/html/samples/dev/*.html; do
    sed -i "s/localhost:8897/${IINK_APIHOST}/g" "${filename}"
    sed -i "s/7d223f9e-a3cb-4213-ba4b-85e930605f8b/${IINK_APPLICATIONKEY}/g" "${filename}"
    sed -i "s/5ab1935e-529a-4d48-a695-158450e52b13/${IINK_HMACKEY}/g" "${filename}"
done

#find /usr/share/nginx/html/samples/ -type f -name '*_iink.html' -print0 | xargs -0 sed -i "s/\(scheme\:\)\([[:space:]]\+\)\('https\?'\)/\1\2'${IINK_APISCHEME}'/g"
#find /usr/share/nginx/html/samples/ -type f -name '*.html' ! -name '*_iink.html' -print0 | xargs -0 sed -i "s/\(scheme\:\)\([[:space:]]\+\)\('https\?'\)/\1\2'${CDK_APISCHEME}'/g"

for filename in /usr/share/nginx/html/samples/*.html; do
    sed -i "s/webdemoapi.myscript.com/${CDK_APIHOST}/g" "${filename}"
    sed -i "s/newcloud.myscript.com/${IINK_APIHOST}/g" "${filename}"

    sed -i "s/515131ab-35fa-411c-bb4d-3917e00faf60/${CDK_APPLICATIONKEY}/g" "${filename}"
    sed -i "s/54b2ca8a-6752-469d-87dd-553bb450e9ad/${CDK_HMACKEY}/g" "${filename}"

    sed -i "s/7d223f9e-a3cb-4213-ba4b-85e930605f8b/${IINK_APPLICATIONKEY}/g" "${filename}"
    sed -i "s/5ab1935e-529a-4d48-a695-158450e52b13/${IINK_HMACKEY}/g" "${filename}"
done

nginx
