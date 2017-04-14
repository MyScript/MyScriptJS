FROM nginx:1.11-alpine

ENV LISTEN_PORT 80

COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY delivery /usr/share/nginx/html
COPY *.sh /
RUN chmod a+x /entrypoint.sh

RUN /createIndexFile.sh

ENV APIHOST "webdemoapi.myscript.com"
ENV APPLICATIONKEY "515131ab-35fa-411c-bb4d-3917e00faf60"
ENV HMACKEY "54b2ca8a-6752-469d-87dd-553bb450e9ad"

ENTRYPOINT ["/entrypoint.sh"]
