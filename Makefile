
all: builddist

prepare:
	@npm install --unsafe-perm
	@bower install --allow-root

cleandist:
	@rm -rf dist

builddist: cleandist
		grunt
