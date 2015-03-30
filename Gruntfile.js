'use strict';
/* jshint camelcase:false */
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        license: grunt.file.read('LICENSE'),
        bowerrc: grunt.file.readJSON('.bowerrc'),
        fileList: grunt.file.readJSON('build.json'),

        // Project settings
        project: {
            // variables
            src: 'src',
            tmp: '.tmp',
            test: 'test',
            unit: 'unit',
            func: 'func',
            dist: 'dist',
            docs: 'docs',
            samples: 'samples',
            test_results: 'test_results'
        },
        mochaTest: {
            options: {
                timeout: 2000,
                reporter: 'spec'
            },
            unit: {
                src: ['<%= project.test %>/<%= project.unit %>/**/*.js']
            },
            func: {
                options: {
                    captureFile: '<%= project.test_results %>/<%= project.func %>/results.txt'
                },
                src: ['<%= project.test %>/<%= project.func %>/**/*.js']
            }
        },
        karma: {
            options: {
                configFile: '<%= project.test %>/karma.conf.js',
                singleRun: true,
                background: false
            },
            unit: {
                options: {
                    coverageReporter: {
                        type: 'html',
                        dir: '<%= project.test_results %>/<%= project.unit %>/coverage/'
                    },
                    junitReporter: {
                        suite: 'unit',
                        outputFile: '<%= project.test_results %>/<%= project.unit %>/<%= project.unit %>.xml'
                    },
                    htmlReporter: {
                        type: 'html',
                        outputFile: '<%= project.test_results %>/<%= project.unit %>/result.html'
                    },
                    files: [
                        '<%= bowerrc.directory %>/cryptojslib/components/core-min.js',
                        '<%= bowerrc.directory %>/cryptojslib/components/x64-core-min.js',
                        '<%= bowerrc.directory %>/cryptojslib/components/sha512-min.js',
                        '<%= bowerrc.directory %>/cryptojslib/components/hmac-min.js',
                        '<%= bowerrc.directory %>/q/q.js',
                        '<%= fileList %>',
                        '<%= project.test %>/<%= project.unit %>/**/*.js'
                    ]
                }
            },
			func: {
                options: {
                    coverageReporter: {
                        type: 'html',
                        dir: '<%= project.test_results %>/<%= project.func %>/coverage/'
                    },
                    junitReporter: {
                        suite: 'unit',
                        outputFile: '<%= project.test_results %>/<%= project.func %>/<%= project.func %>.xml'
                    },
                    htmlReporter: {
                        type: 'html',
                        outputFile: '<%= project.test_results %>/<%= project.func %>/result.html'
                    },
                    files: [
                        '<%= bowerrc.directory %>/cryptojslib/components/core-min.js',
                        '<%= bowerrc.directory %>/cryptojslib/components/x64-core-min.js',
                        '<%= bowerrc.directory %>/cryptojslib/components/sha512-min.js',
                        '<%= bowerrc.directory %>/cryptojslib/components/hmac-min.js',
                        '<%= bowerrc.directory %>/q/q.js',
                        '<%= fileList %>',
                        //'<%= project.dist %>/myscript.min.js',
                        '<%= project.test %>/<%= project.func %>/**/testMath.js'
                    ]
                }
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish-ex'),
                jshintrc: '.jshintrc'
            },
            default: {
                src: [
                    '<%= project.src %>/**/*.js'
                ]
            },
            test_unit: {
                options: {
                    jshintrc: '<%= project.test %>/.mocha.jshintrc'
                },
                src: [
                    '<%= project.test %>/<%= project.unit %>/**/*.js'
                ]
            },
            test_func: {
                options: {
                    jshintrc: '<%= project.test %>/.mocha.jshintrc'
                },
                src: [
                    '<%= project.test %>/<%= project.func %>/**/*.js'
                ]
            }
        },
        concat: {
            default: {
                options: {
                    sourceMap: true
                },
                src: '<%= fileList %>',
                dest: '<%= project.tmp %>/<%= pkg.name %>.js'
            },
            raw: {
                src: '<%= fileList %>',
                dest: '<%= project.dist %>/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                preserveComments: false,
                mangle: false,
                nonull: true,
                sourceMap: true,
                sourceMapIn: '<%= project.tmp %>/<%= pkg.name %>.js.map',
                banner: '/*\n <%= pkg.name %> - <%= pkg.description %>\n Version: <%= pkg.version %>\n License: <%= pkg.license %>\n */'
            },
            default: {
                files: [{
                    expand: true,
                    flatten: true,
                    cwd: '<%= project.tmp %>',
                    src: '<%= pkg.name %>.js',
                    dest: '<%= project.dist %>',
                    ext: '.min.js'
                }]
            }
        },
        clean: {
            default: {
                files: [{
                    dot: true,
                    src: [
                        '<%= project.tmp %>',
                        '<%= project.dist %>',
                        '<%= project.test_results %>'
                    ]
                }]

            },
            tmp: {
                files: [{
                    dot: true,
                    src: [
                        '<%= project.tmp %>'
                    ]
                }]
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= project.dist %>'
                    ]
                }]
            },
            test_unit_results: {
                files: [{
                    dot: true,
                    src: [
                        '<%= project.test_results %>/<%= project.unit %>'
                    ]
                }]
            },
            test_func_results: {
                files: [{
                    dot: true,
                    src: [
                        '<%= project.test_results %>/<%= project.func %>'
                    ]
                }]
            }
        },
        copy: {
            template: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= bowerrc.directory %>/yuidoc-bootstrap3-theme/dist',
                    dest: '<%= project.tmp %>',
                    src: ['**']
                }]
            },
            styles: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= project.docs %>/styles',
                    dest: '<%= project.tmp %>/assets',
                    src: ['**']
                }]
            },
            conf: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= project.docs %>',
                    dest: '<%= project.tmp %>',
                    src: ['theme.json']
                }]
            },
            samples: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= project.samples %>',
                    dest: '<%= project.dist %>/<%= project.samples %>',
                    src: ['**']
                }, {
                    expand: true,
                    dot: true,
                    flatten: true,
                    cwd: '<%= bowerrc.directory %>',
                    dest: '<%= project.dist %>/<%= project.samples %>/lib',
                    src: [
                        'cryptojslib/components/core-min.js',
                        'cryptojslib/components/x64-core-min.js',
                        'cryptojslib/components/sha512-min.js',
                        'cryptojslib/components/hmac-min.js',
                        'q/q.js'
                    ]
                }]
            },
            readme: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '',
                    dest: '<%= project.dist %>',
                    src: ['README.md']
                }]
            }
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    exclude: 'third_party',
                    extension: '.js,.html',
                    paths: '<%= project.src %>',
                    outdir: '<%= project.dist %>/<%= project.docs %>',
                    linkNatives: 'true',
                    tabtospace: 2,
                    themedir: '<%= project.tmp %>',
                    helpers: ['<%= project.docs %>/helpers.js']
                }
            }
        },
        // Run some tasks in parallel to speed up the build process
        concurrent: {
            default: [
                'build',
                'docs'
            ]
        }
    });

    grunt.registerTask('default', [
        'clean:default',
        'jshint:default',
        'test-unit',
        'concurrent',
        'copy:readme'
    ]);

    grunt.registerTask('test', [
        'test-unit',
        'test-func'
    ]);

    grunt.registerTask('test-unit', [
        'clean:test_unit_results',
        'jshint:test_unit',
        'karma:unit'
    ]);

    grunt.registerTask('test-func', [
        'clean:test_func_results',
        'jshint:test_func',
        'karma:func'
    ]);

    grunt.registerTask('build', [
        'clean:tmp',
        'concat',
        'uglify',
        'concat:raw',
        'clean:tmp'
    ]);

    grunt.registerTask('docs', [
        'clean:tmp',
        'copy:template',
        'copy:styles',
        'copy:conf',
        'yuidoc',
        'copy:samples',
        'clean:tmp'
    ]);

};