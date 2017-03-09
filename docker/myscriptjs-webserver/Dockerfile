# Pull base image.
FROM nginx:1.11

ENV LISTEN_PORT 80

COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY delivery /usr/share/nginx/html
COPY delivery /usr/share/nginx/html/dev
COPY *.sh /
COPY entrypoint.sh /entrypoint.sh
RUN chmod a+x /entrypoint.sh

RUN /createIndexFile.sh

ENTRYPOINT ["/entrypoint.sh"]
