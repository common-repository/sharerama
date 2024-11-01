// gruntjs.com
 
/*jshint node:true*/
module.exports = function(grunt) {
	'use strict';

	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		cmpnt: grunt.file.readJSON('../bower.json'),
		sharerama: grunt.file.readJSON('../../package.json'),
		banner: '/*! Sharerama v<%= sharerama.version %> | Neat share buttons for WP by Artem Polikarpov | ' +
				'http://sharerama.com/\n' +
			  ' *  Built on top of Social Likes v<%= cmpnt.version %> by Artem Sapegin | ' +
				'http://sapegin.github.com/social-likes/\n' +
				' *  MIT License\n */\n',
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			files: ['social-likes.js']
		},
		jscs: {
			options: {
				config: ".jscs.json"
			},
			files: ['<%= jshint.files %>']
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: 'social-likes.js',
				dest: '../../sharerama.js'
			}
		},
		stylus: {
			options: {
				urlfunc: 'embedurl',
        // sharerama diff >>>
        compress: false,
        // <<< sharerama diff
				use: [
					function() { return require('autoprefixer-stylus')('last 2 versions', 'ie 9'); }
				]
			},
			compile: {
				files: {
          '../../sharerama.css': 'styles/sharerama/index.styl'
				}
			},
//			contrib: {
//				options: {
//					compress: false
//				},
//				files: {
//					'../contrib/css/github.css': '../contrib/styles/github.styl',
//					'../contrib/css/livejournal.css': '../contrib/styles/livejournal.styl'
//				}
//			}
		},
		csso: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				expand: true,
				flatten: true,
				src: '../../*.css',
				dest: '../../'
			}
		},
		webfont: {
//			flat: {
//				src: 'styles/flat/icons/*.svg',
//				dest: 'styles/flat/font',
//				options: {
//					font: 'social-likes',
//					types: 'woff',
//					embed: 'woff',
//					template: 'styles/flat/webfont.styl',
//					stylesheet: 'styl',
//					hashes: false,
//					htmlDemo: false,
//					startCodepoint: 0xF101
//				}
//			},
      sharerama: {
				src: 'styles/sharerama/icons/*.svg',
				dest: 'styles/sharerama/font',
				options: {
					font: 'sharerama',
					types: 'woff',
					embed: 'woff',
					template: 'styles/sharerama/webfont.styl',
					stylesheet: 'styl',
					hashes: false,
					htmlDemo: false,
					startCodepoint: 0xF101
				}
			}
		},
//		imagemin: {
//			options: {
//				pngquant: true
//			},
//			classic: {
//				files: [
//					{
//						expand: true,
//						cwd: 'styles/classic/icons_src/',
//						src: '*.png',
//						dest: 'styles/classic/icons/'
//					}
//				]
//			},
//			birman: {
//				files: [
//					{
//						expand: true,
//						cwd: 'styles/birman/icons_src/',
//						src: '*.png',
//						dest: 'styles/birman/icons/'
//					}
//				]
//			}
//		},
		watch: {
			options: {
				livereload: true,
				atBegin: true
			},
      webfont: {
        files: ['styles/flat/icons/*.svg', 'styles/sharerama/icons/*.svg'],
        tasks: ['webfont']
      },
			stylus: {
				files: 'styles/**/*.styl',
				tasks: ['stylus:compile']
			},
			js: {
				files: '<%= jshint.files %>',
				tasks: ['jshint', 'uglify']
			}
		}
	});

	grunt.registerTask('default', ['jshint', 'uglify', 'webfont', 'stylus', 'csso']);

};