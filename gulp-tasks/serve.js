/*
@license
Copyright (c) 2016 GDG Spain
This code may only be used under the MIT style license found at LICENSE.txt
*/

'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

var dist = require('./dist');

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
  serve(['.tmp', 'app']);

  gulp.watch(['app/**/*.html', '!app/bower_components/**/*.html'], ['lint', reload]);
  gulp.watch(['app/images/**/*'], reload);
  gulp.watch(['app/scripts/**/*.js'], ['lint', reload]);
  gulp.watch(['app/styles/**/*.css'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function() {
  serve([dist()]);
});
