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
      test: {
        files: {
          "<%= config.test %>/script.js": ["<%= config.app %>/lib/**/jquery.js",
            "<%= config.app %>/lib/**/jquery.mousewheel.js",
            "<%= config.app %>/lib/**/underscore.js","<%= config.app %>/lib/**/backbone.js",
            "<%= config.app %>/lib/**/tinymce.min.js","<%= config.app %>/lib/ImgPreloader.js",
            "<%= config.app %>/model/**/*.js","<%= config.app %>/js/**/*.js"]
        }
      }
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
      },
      dist: {
        expand: true,
        cwd: "<%= config.test %>",
        dest: "<%= config.dist %>",
        src: ["fonts/**", "model/**"]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%= config.dist %>/style.css': '<%= config.test %>/style.css'
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '<%= config.dist %>/index.html': '<%= config.test %>/index.html'
        }
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: "<%= config.test %>/img",
          dest: "<%= config.dist %>/img",
          src: ['**/*.{png,jpg,gif}']
        }]
      }
    },
    jshint: {
      watch: {
        src: ['<%= config.app %>/js/**/*.js']
      }
    },
    sass: {
      watch: {
        files: {
          "<%= config.app %>/style.css": "<%= config.app %>/scss/style.scss"
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= config.dist %>/script.js': '<%= config.test %>/script.js'
        }
      }
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
        tasks: ["sass", "autoprefixer"]
      },
      bower: {
        files: ['bower.json'],
        tasks: ["bower", "copy:normalize"]
      },
      jshint: {
        files: ['<%= config.app %>/js/**/*.js'],
        tasks: ["jshint"]
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
  grunt.registerTask('default', ["copy:test", "concat:test"]);
  grunt.registerTask('dist', ["default", "copy:dist", "imagemin:dist",
    "htmlmin:dist", "uglify:dist", "cssmin:dist"]);
};
