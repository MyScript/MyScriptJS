# Pull base image.
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY delivery /usr/share/nginx/html
COPY delivery /usr/share/nginx/html/dev
COPY *.sh /

RUN /createIndexFile.sh
