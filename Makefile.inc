SHELL = /bin/bash
GIT_VERSION := $(shell git describe --tags --long --always)
VERSION = 1.2.3

OFFLINE = false
ifeq ($(OFFLINE),true)
    BOWER_PARAMETERS := --offline
endif

MAKE := $(MAKE) --no-print-directory

NPM_CACHE = $(HOME)/.npm

CURRENT_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))

GITHUB = https://github.com/MyScript/MyScriptJS.git
