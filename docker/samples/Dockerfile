FROM nginx:stable-alpine

COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY delivery /usr/share/nginx/html
COPY *.sh /
RUN chmod a+x /entrypoint.sh

RUN /createIndexFile.sh

ENV LISTEN_PORT 80
ENV CDK_APIHOST "webdemoapi.myscript.com"
ENV CDK_APISCHEME "https"
ENV CDK_APPLICATIONKEY "515131ab-35fa-411c-bb4d-3917e00faf60"
ENV CDK_HMACKEY "54b2ca8a-6752-469d-87dd-553bb450e9ad"

ENV IINK_APIHOST "newcloud.myscript.com"
ENV IINK_APISCHEME "https"
ENV IINK_APPLICATIONKEY "7d223f9e-a3cb-4213-ba4b-85e930605f8b"
ENV IINK_HMACKEY "5ab1935e-529a-4d48-a695-158450e52b13"

ENTRYPOINT ["/entrypoint.sh"]
