FROM nginx:1.11-alpine

ENV LISTEN_PORT 80

COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY delivery /usr/share/nginx/html
COPY *.sh /
RUN chmod a+x /entrypoint.sh

RUN /createIndexFile.sh

ENTRYPOINT ["/entrypoint.sh"]
