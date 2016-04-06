/*
@license
Copyright (c) 2016 GDG Spain
This code may only be used under the MIT style license found at LICENSE.txt
*/

'use strict';

var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var historyApiFallback = require('connect-history-api-fallback');

var DIST = 'dist';

var dist = function(subpath) {
  return !subpath ? DIST : path.join(DIST, subpath);
};

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

// Clean output directory
gulp.task('clean', function() {
  return del(['.tmp', dist()]);
});

// Copy all files at the root level (app)
gulp.task('copy', function() {
  var app = gulp.src([
    'app/*',
    '!app/{elements,bower_components}'
  ], {
    dot: true
  }).pipe(gulp.dest(dist()));

  // Copy over only the bower_components we need
  // These are things which cannot be vulcanized
  var bower = gulp.src([
    'app/bower_components/{webcomponentsjs,promise-polyfill}/**/*'
  ]).pipe(gulp.dest(dist('bower_components')));

  return merge(app, bower)
    .pipe($.size({
      title: 'copy'
    }));
});

// Compile styles
gulp.task('styles', function() {
  var stylesPath = 'styles';

  return gulp.src(['**/*.css'].map(function(src) {
      return path.join('app', stylesPath, src);
    }))
    .pipe($.changed(stylesPath, {extension: '.css'}))
    .pipe(gulp.dest('.tmp/' + stylesPath))
    .pipe($.minifyCss())
    .pipe(gulp.dest(dist(stylesPath)))
    .pipe($.size({title: stylesPath}));
});

// Scan your HTML for assets & optimize them
gulp.task('html', function() {
  return gulp.src(['app/**/*.html', '!app/{elements,bower_components}/**/*.html'])
    .pipe($.useref({searchPath: ['.tmp', 'app']}))
    // Concatenate and minify JavaScript
    .pipe($.if('*.js', $.uglify({
      preserveComments: 'some'
    })))
    // Concatenate and minify styles
    // In case you are still using useref build blocks
    .pipe($.if('*.css', $.minifyCss()))
    // Minify any HTML
    .pipe($.if('*.html', $.minifyHtml({
      quotes: true,
      empty: true,
      spare: true
    })))
    // Output files
    .pipe(gulp.dest(dist()))
    .pipe($.size({
      title: 'html'
    }));
});

// Vulcanize granular configuration
gulp.task('vulcanize', function() {
  return gulp.src('app/elements/gdgspain-app/gdgspain-app.html')
    .pipe($.vulcanize({
      stripComments: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest(dist('elements/gdgspain-app')))
    .pipe($.size({title: 'vulcanize'}));
});

// Build production files, the default task
gulp.task('default', ['clean'], function(cb) {
  runSequence(
    ['copy', 'styles'],
    'html',
    'vulcanize',
    cb);
});
