/*global module:false*/
module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    simplemocha: {
      options: {
        timeout: 3000,
        ignoreLeaks: false,
        reporter: 'tap'
      },

      all: { src: ['tests/**/*.js'] }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: false,
        eqnull: false,
        "-W041": false, // ignores ==
        globals: {
          module: true,
          console: true
        }
      },
      files: ['Gruntfile.js', 'test/**/*.js', 'noobjs_funk.js']
    }
  });


  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');


  grunt.registerTask('default', ['simplemocha', 'jshint']);

};
