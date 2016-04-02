/*
@license
Copyright (c) 2016 GDG Spain
This code may only be used under the MIT style license found at LICENSE.txt
*/

'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

var serve = function(baseDir) {
  browserSync({
    port: 5000,
    notify: false,
    snippetOptions: {
      rule: {
        match: '<span id="browser-sync-binding"></span>',
        fn: function(snippet) {
          return snippet;
        }
      }
    },
    server: {
      baseDir: baseDir,
      middleware: [historyApiFallback()]
    }
  });
};

// Serve project and watch files for changes
gulp.task('serve', ['lint'], function() {
  serve(['app']);

  gulp.watch(['app/**/*.html', '!app/bower_components/**/*.html'], ['lint', reload]);
  gulp.watch(['app/images/**/*'], reload);
  gulp.watch(['app/scripts/**/*.js'], ['lint', reload]);
  gulp.watch(['app/styles/**/*.css'], reload);
});

// Lint JavaScript
gulp.task('lint', function() {
  return gulp.src([
      'app/scripts/**/*.js',
      'app/elements/**/*.html',
      'gulpfile.js'
    ])
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failAfterError());
});
