module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: {
      app: 'app',
      dist: 'dist',
      test: 'test'
    },
    concat: {
    },
    copy: {
      test: {
        expand: true,
        cwd: "<%= config.app %>",
        dest: "<%= config.test %>",
        src: ["img/**", "fonts/**", "model/**", "index.html"]
      }
    },
    csslint: {
    },
    cssmin: {
    },
    htmlmin: {
    },
    imagemin: {
    },
    jshint: {
    },
    mincss: {
    },
    sass: {
    },
    uglify: {
    },
    watch: {
    },
    bower: {
    }
  });

  // Load plugins
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-csslint");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-imagemin");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-mincss");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-bower-task");

  // Tasks
  grunt.registerTask('default', ['copy:test']);

};
