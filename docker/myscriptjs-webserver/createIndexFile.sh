#!/bin/sh

set -e

echo "<html>
<head>
    <title>MyScript JS testing pages</title>
</head>
<body>
    <h2>Testing pages<a href=\"/index.html\">[view]</a></h2>
</body>

</html>" > /usr/share/nginx/html/index.html

nginx -g "daemon off;"
