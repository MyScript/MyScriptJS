'use strict';
/* jshint camelcase:false */
module.exports = function(grunt) {
    var banner = [grunt.file.read('LICENSE'), '// @version ' + grunt.file.readJSON('package.json').version, ''].join(grunt.util.linefeed);

    // recursive module builder
    var path = require('path');
    function readManifest(filename, modules) {
        modules = modules || [];
        var lines = grunt.file.readJSON(filename);
        var dir = path.dirname(filename);
        lines.forEach(function(line) {
            var fullpath = path.join(dir, line);
            if (line.slice(-5) === '.json') {
                // recurse
                readManifest(fullpath, modules);
            } else {
                modules.push(fullpath);
            }
        });
        return modules;
    }

    var MyScript = readManifest('build.json');

    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true,
                background: false
            }
        },
        jshint: {
            src: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [
                    'src/**/*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'test/spec/.mocha.jshintrc'
                },
                src: [
                    'test/spec/**/*.js'
                ]
            },
            options: {
                reporter: require('jshint-stylish-ex')
            }
        },
        concat_sourcemap: {
            MyScript: {
                options: {
                    sourcesContent: true
                },
                files: {
                    'dist/MyScript.concat.js': MyScript
                }
            }
        },
        uglify: {
            options: {
                banner: banner,
                nonull: true
            },
            MyScript: {
                options: {
                    sourceMap: 'dist/MyScript.min.js.map',
                    sourceMapIn: 'dist/MyScript.concat.js.map'
                    //mangle: false, beautify: true, compress: false
                },
                files: {
                    'dist/MyScript.min.js': 'dist/MyScript.concat.js'
                }
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
                    paths: 'src',
                    outdir: 'dist/docs',
                    linkNatives: 'true',
                    tabtospace: 2,
                    themedir: 'node_modules/yuidoc-bootstrap-theme',
                    helpers: ['node_modules/yuidoc-bootstrap-theme/helpers/helpers.js']
                }
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            all:{
                files: [
                    {
                        dot: true,
                        src: [
                            'dist',
                            'docs',
                            'test/results'
                        ]
                    }
                ]
            },
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            'dist'
                        ]
                    }
                ]
            },
            docs: {
                files: [
                    {
                        dot: true,
                        src: [
                            'docs'
                        ]
                    }
                ]
            },
            test: {
                files: [
                    {
                        dot: true,
                        src: [
                            'test/results'
                        ]
                    }
                ]
            }

        }
    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-karma');

    // tasks
    grunt.registerTask('sourcemap_copy', 'Copy sourcesContent between sourcemaps', function(source, dest) {
        var sourceMap = grunt.file.readJSON(source);
        var destMap = grunt.file.readJSON(dest);
        destMap.sourcesContent = sourceMap.sourcesContent;
        grunt.file.write(dest, JSON.stringify(destMap));
    });

    grunt.registerTask('default', ['clean:all', 'test', 'build', 'docs']);
    grunt.registerTask('build', ['clean:dist','concat_sourcemap', 'uglify', 'sourcemap_copy:dist/MyScript.concat.js.map:dist/MyScript.min.js.map']);
    grunt.registerTask('minify', ['uglify']);
    grunt.registerTask('docs', ['yuidoc']);
    grunt.registerTask('test', ['jshint:src', 'jshint:test', 'karma']);

};