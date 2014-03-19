module.exports = (grunt) ->

  grunt.initConfig

    svgmin:
      options:
        plugins: [{
          removeViewBox: false
        }]
      files:
        expand: true
        cwd: 'img'
        src: ['*.svg']
        dest: 'img'
        ext: '.svg'

    imageoptim:
      options:
        imageAlpha: true
        # jpegMini: true
        quitAfter: true
      compress:
        src: [
          'img'
        ]

    stylus:
      compile:
        options:
          paths: ['css']
          use: ['nib']
          import: ['nib', 'common']
          compress: true
          urlfunc: 'embedurl'
        files:
          'css/17kp.min.css': [
            'css/normalize.css'
            'css/setup.styl'
            'css/grid.styl'
            'css/typografier.styl'
            'css/list-group.styl'
            'css/main.styl'
            'css/*.styl'
            '!css/common.styl'
            '!css/grid-builder.styl'
          ]

    coffee:
      compile:
        files:
          'js/17kp.coffee.js': [
            'js/*.coffee'
          ]

    uglify:
      prod:
        options:
          mangle: true
          compress: true
          preserveComments: 'some'
        files:
          'js/17kp.min.js': [
            'js/$.min.js'
            'js/17kp.coffee.js'
          ]

    concat:
      dev:
        files:
          'js/17kp.min.js': [
            'js/$.min.js'
            'js/17kp.coffee.js'
          ]

    parallel:
      dev:
        options:
          stream: true
        tasks: [
          {
            grunt: true
            args: ['watch']
          }
          {
            cmd: 'jekyll'
            args: [
              'serve'
              '--watch'
              '--config', '_config.yml'
            ]
          }
        ]

    watch:
      options:
        livereload: true
      stylus:
        options:
          livereload: false
        files: ['css/*.styl']
        tasks: ['stylus']
      # coffee:
      #   options:
      #     livereload: false
      #   files: ['js/*.coffee']
      #   tasks: ['coffee', 'concat:dev']
      css:
        files: ['_site/css/*.css']
      # js:
      #   files: ['_site/js/*.js']
      html:
        files: ['_site/*.html']

  require('load-grunt-tasks')(grunt)

  grunt.registerTask 'build', [
    'svgmin'
    'imageoptim'
    'stylus'
    # 'coffee'
    # 'uglify:prod'
  ]

  grunt.registerTask 'default', [
    'parallel:dev'
  ]
