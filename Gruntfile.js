module.exports = function (grunt) {
	'use strict';

	var copies = grunt.file.readJSON('copies.json'),
		sourceFiles = [
			'sharerama/sharerama*.css',
			'sharerama/sharerama*.js'
		],
		sourceFilesToClean = [
			'sharerama*.css',
			'sharerama*.js'
		],
		sourceTasks = ['clean:source', 'copy:source'],
		copyToWPFiles = [
			'sharerama*.css',
			'sharerama*.js',
			'sharerama*.php',
			'readme.txt'
		],
		copyToWPTasks = ['clean:copyToWP', 'copy:copyToWP'];

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			options: {
				atBegin: true
			},
			copyToWP: {
				files: copyToWPFiles,
				tasks: copyToWPTasks
			},
			source: {
				files: sourceFiles,
				tasks: sourceTasks
			}
		},
		clean: {
			options: {
				force: true
			},
			source: sourceFilesToClean,
			copyToWP: (function () {
				return copies.map(function (path) {
					return path + 'sharerama/'
				});
			})()
		},
		copy: {
			source: {
				files: [
			      {
			        expand: true,
			        flatten: true,
			        src: sourceFiles,
			        dest: './'
			      }
			    ]
			},
			copyToWP: {
				files: (function () {
					return copies.map(function (path) {
						return {
							src: copyToWPFiles,
							dest: path + 'sharerama/'
						}
					});
				})()
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-replace');

	grunt.registerTask('default', ['clean', 'copy']);
};