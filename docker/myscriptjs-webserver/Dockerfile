# Pull base image.
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY delivery/build /usr/share/nginx/html
COPY *.sh /

ENTRYPOINT ["/createIndexFile.sh"]

EXPOSE 80

