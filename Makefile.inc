SHELL = /bin/bash
GIT_VERSION := $(shell git describe --tags --long --always)

MAKE := $(MAKE) --no-print-directory

NPM_CACHE = $(HOME)/.npm

CURRENT_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))
