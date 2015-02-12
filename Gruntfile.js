'use strict';
/* jshint camelcase:false */
module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// recursive module builder
	var path = require('path');

	function readManifest (filename, modules) {
		modules = modules || [];
		var lines = grunt.file.readJSON(filename);
		var dir = path.dirname(filename);
		lines.forEach(function (line) {
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

	var fileList = readManifest('build.json');

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		license: grunt.file.read('LICENSE'),
		bowerrc: grunt.file.readJSON('.bowerrc'),

		// Project settings
		project: {
			// variables
			src: 'src',
			tmp: '.tmp',
			test: 'test',
			dist: 'dist',
			docs: 'docs',
			samples: 'samples'
		},

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
					'<%= project.src %>/**/*.js'
				]
			},
			test: {
				options: {
					jshintrc: '<%= project.test %>/spec/.mocha.jshintrc'
				},
				src: [
					'<%= project.test %>/spec/**/*.js'
				]
			},
			options: {
				reporter: require('jshint-stylish-ex')
			}
		},
		concat: {
			options: {
				sourceMap: true
			},
			dist: {
				src: fileList,
				dest: '<%= project.tmp %>/<%= pkg.name %>.concat.js'
			}
		},
		uglify: {
			options: {
				preserveComments: false,
				mangle: true,
				compress: false,
				nonull: true,
				banner: '/*\n <%= pkg.name %> - <%= pkg.description %>\n Version: <%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n License: <%= pkg.license %>\n */'
			},
			dist: {
				options: {
					sourceMap: true,
					sourceMapIn: '<%= project.tmp %>/<%= pkg.name %>.concat.js.map'
				},
				files: {
					'<%= project.dist %>/<%= pkg.name %>.min.js': '<%= project.tmp %>/<%= pkg.name %>.concat.js'
				}
			}
		},
		clean: {
			tmp: {
				files: [
					{
						dot: true,
						src: [
							'<%= project.tmp %>'
						]
					}
				]
			},
			dist: {
				files: [
					{
						dot: true,
						src: [
							'<%= project.dist %>'
						]
					}
				]
			},
			test: {
				files: [
					{
						dot: true,
						src: [
							'<%= project.test %>/results'
						]
					}
				]
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
			'non-minified': {
				files: [{
					src: '<%= project.tmp %>/<%= pkg.name %>.concat.js',
					dest: '<%= project.dist %>/<%= pkg.name %>.js'
				}]
			},
			samples: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= project.samples %>',
					dest: '<%= project.dist %>/<%= project.samples %>',
					src: ['**']
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
		}
	});

	grunt.registerTask('default', [
		'clean',
		'test',
		'build',
		'docs'
	]);

	grunt.registerTask('test', [
		'clean:test',
		'jshint',
		'karma'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'concat',
		'uglify',
		'copy:non-minified',
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