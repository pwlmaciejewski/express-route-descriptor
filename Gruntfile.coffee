module.exports = (grunt) ->
	grunt.initConfig
		watch: 
			coffee: 
				files: '<%= coffee.all.src %>'
				tasks: 'coffeeReset'

		coffee: 
			all: 
				expand: true
				src: ['lib/**/*.coffee', 'test/**/*.coffee']
				ext: '.js'

		clean: 
			all: 
				src: ['lib/**/*.js', 'test/**/*.js']

	grunt.loadNpmTasks 'grunt-contrib-clean'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-buster'

	grunt.registerTask 'coffeeReset', ['clean', 'coffee']
	grunt.registerTask 'test', ['buster']