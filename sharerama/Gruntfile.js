module.exports = function (grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		sharerama: grunt.file.readJSON('package.json'),
		banner: '/*! Sharerama v<%= sharerama.version %> | Neat share buttons for WP by Artem Polikarpov | ' +
				'http://sharerama.com/\n' +
				' *  MIT License\n */\n',
		watch: {
			options: {
				atBegin: true
			},
			webfont: {
				files: ['styl/icons/*.svg', 'styl/fonts/templates/*.css'],
				tasks: ['webfont']
			},
			stylus: {
				files: ['styl/**/*.styl', 'styl/fonts/*.css'],
				tasks: ['stylus', 'autoprefixer', 'csso']
			},
			js: {
				files: 'js/*.js',
				tasks: ['uglify']
			}
		},
		webfont: {
            sharerama: {
				src: 'styl/icons/*.svg',
				dest: 'styl/fonts/',
				options: {
					font: 'sharerama',
					types: 'woff',
					embed: 'woff',
					template: 'styl/fonts/templates/sharerama.css',
					hashes: false,
					htmlDemo: false,
					startCodepoint: 0xF101
				}
			}
		},
		stylus: {
			main: {
				options: {
					'include css': true,
					compress: false,
					paths: ['stylus', 'styl/i'],
					urlfunc: {
						name: 'inline-image', // use inline-image('test.png') to trigger Data URI embedding
						limit: false,
						paths: ['styl/i']
					}
				},
				files: {
					'sharerama-classic.css': 'styl/classic.styl'
				}
			}
		},
		autoprefixer: {
			all: {
				options: {
					browsers: ['last 2 versions', 'ie 9']
				},
				files: [
					{
						expand: true,
						cwd: '',
						src: '*.css',
						dest: ''
					}
				]
			}
		},
		csso: {
			options: {
				banner: '<%= banner %>'
			},
			all: {
				files: [
					{
						expand: true,
						cwd: '',
						src: '*.css',
						dest: ''
					}
				]
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			main: {
				files: {
					'sharerama.js': [
						'js/popup.js',
						'js/data.js'
					]
				}
			}
		}
	});

	grunt.registerTask('default', ['webfont', 'stylus', 'autoprefixer', 'csso', 'uglify']);
};