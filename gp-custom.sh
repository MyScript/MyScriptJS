#!/bin/bash -e

src=${PWD}

cd docs >/dev/null
echo "{
  \"directory\": \"components\"
}
" > .bowerrc
bower install -q ${src}
cp -r ${src}/bower_components/* components # FIXME hack to override installed deps and install dev ones

echo "<META http-equiv="refresh" content=\"0;URL=components/myscript/\">" >index.html
cd - >/dev/null
