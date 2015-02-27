
all: build

prepare:
	@npm install --unsafe-perm
	@bower install --allow-root

build: prepare
		grunt
