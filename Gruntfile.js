module.exports = function(grunt) {
  var L = grunt.log.writeln;
  var BANNER = '/**\n' +
                ' * transcribble <%= pkg.version %> built on <%= grunt.template.today("yyyy-mm-dd") %>.\n' +
                ' * Copyright (c) 2015 Zachary Carter <zacharycarter@pathfinderstudios.net>\n' +
                ' *\n' +
                ' * http://www.transcribble.io  http://github.com/zacharycarter/transcribble\n' +
                ' */\n';
  var BUILD_DIR = 'build';
  var RELEASE_DIR = 'public';
  var TARGET_RAW = BUILD_DIR + '/transcribble-debug.js';
  var TARGET_MIN = BUILD_DIR + '/transcribble-min.js';

  var SOURCES = [ "src/transcribble.js", "src/main.js", "src/*.js", "!src/header.js", "!src/container.js"];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: BANNER
      },
      build: {
        src: SOURCES,
        dest: TARGET_RAW
      }
    },
    uglify: {
      options: {
        banner: BANNER,
        sourceMap: true
      },
      build: {
        src: SOURCES,
        dest: TARGET_MIN
      }
    },
    jshint: {
      files: SOURCES,
      options: {
        eqnull: true,   // allow == and ~= for nulls
        sub: true,      // don't enforce dot notation
        trailing: true, // no more trailing spaces
        globals: {
          "transcribble": false,
          "Raphael": false
         }
      }
    },
    qunit: {
      files: ['tests/flow.html']
    },
    watch: {
      scripts: {
        files: ['src/*', 'Gruntfile.js'],
        tasks: ['concat', 'jshint'],
        options: {
          interrupt: true
        }
      }
    },
    copy: {
      release: {
        files: [
          {
            expand: true,
            dest: RELEASE_DIR + "/js/",
            cwd: BUILD_DIR,
            src    : ['*.js', '*.map']
          },
          {
            expand: true,
            dest: RELEASE_DIR,
            cwd: BUILD_DIR,
            src    : ['docs/**']
          }
        ]
      }
    },
    docco: {
      src: SOURCES,
      options: {
        layout: 'linear',
        output: 'build/docs'
      }
    },
    gitcommit: {
      releases: {
        options: {
          message: "Committing release binaries for new version: <%= pkg.version %>",
          verbose: true
        },
        files: [
          {
            src: [RELEASE_DIR + "/*.js", RELEASE_DIR + "/*.map"],
            expand: true
          }
        ]
      }
    },
    bump: {
      options: {
        files: ['package.json', 'component.json'],
        commitFiles: ['package.json', 'component.json'],
        updateConfigs: ['pkg'],
        createTag: false,
        push: false
      }
    },
    release: {
      options: {
        bump: false,
        commit: false
      }
    },
    clean: [BUILD_DIR, RELEASE_DIR],
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-docco');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-git');

  // Default task(s).
  // grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'docco']);

  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

  grunt.registerTask('test', 'Run qunit tests.', function() {
    grunt.task.run('qunit');
  });

  // Release current build.
  grunt.registerTask('stage', 'Stage current binaries to releases.', function() {
    grunt.task.run('default');
    grunt.task.run('copy:release');
  });

  // Increment package version and publish to NPM.
  grunt.registerTask('publish', 'Publish transcribble NPM.', function() {
    grunt.task.run('bump');
    grunt.task.run('stage');
    grunt.task.run('test');
    grunt.task.run('gitcommit:releases');
    grunt.task.run('release');
  });
};