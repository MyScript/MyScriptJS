# Pull base image.
FROM nginx:1.11

COPY delivery /usr/share/nginx/html
COPY *.sh /

RUN ./patch_dev.sh
