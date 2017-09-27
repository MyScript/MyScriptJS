FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY delivery /usr/share/nginx/html
COPY *.sh /
RUN chmod a+x /entrypoint.sh

RUN /createIndexFile.sh

ENV LISTEN_PORT 80
ENV APISCHEME "https"
ENV APIHOST "webdemoapi.myscript.com"

ENTRYPOINT ["/entrypoint.sh"]
