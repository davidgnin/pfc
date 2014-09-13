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
        src: ["img/**", "fonts/**", "model/**", "index.html", "style.css"]
      },
      normalize: {
        files: {
          "<%= config.app %>/scss/normalize.scss":
            "<%= config.app %>/lib/normalize-css/normalize.css"
        }
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
    sass: {
      watch: {
        files: {
          "<%= config.app %>/style.css": "<%= config.app %>/scss/style.scss"
        }
      }
    },
    uglify: {
    },
    bower: {
      install: {
        options: {
          targetDir: "<%= config.app %>/lib"
        }
      }
    },
    watch: {
      sass: {
        files: ['<%= config.app %>/scss/**'],
        tasks: ['sass', 'autoprefixer']
      },
      bower: {
        files: ['bower.json'],
        tasks: ["bower", "copy:normalize"]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8']
      },
      watch: {
        files: { "<%= config.app %>/style.css": "<%= config.app %>/style.css" }
      }
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
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-bower-task");
  grunt.loadNpmTasks("grunt-autoprefixer");

  // Tasks
  grunt.registerTask('default', ['copy:test']);

};
