// File: Gulpfile.js
'use strict';
var gulp      = require('gulp'),
    connect   = require('gulp-connect'),
    jshint    = require('gulp-jshint'),
    jade      = require('gulp-jade'),
    stylish   = require('jshint-stylish'),
    plumber   = require('gulp-plumber');

// Servidor web de desarrollo
gulp.task('server', function() {
  connect.server({
    root: './app',
    hostname: '0.0.0.0',
    port: 3000,
    livereload: true,
  });
});

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
  return gulp.src('./app/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});
// Traducir codigo Jade a HTML
gulp.task('jade2html', function(){
    gulp.src('./app/templates/*.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('app'))
});

gulp.task('layout', function(){
    gulp.src('./app/templates/layout.jade')
    .pipe(plumber())
    .pipe(connect.reload())
});

gulp.task('quienes_somos', function(){
    gulp.src('./app/templates/quienes_somos.jade')
    .pipe(plumber())
    .pipe(connect.reload())
});

gulp.task('style', function(){
    gulp.src('./app/styles/**/*.css')
    .pipe(plumber())
    .pipe(connect.reload())
});

// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
  gulp.src('./app/*.html')
  .pipe(connect.reload());
});

// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
  gulp.watch(['./app/templates/*.jade'], ['jade2html', 'layout', 'quienes_somos']);
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/styles/**/*.css'], ['style']);
  gulp.watch(['./app/scripts/**/*.js', './Gulpfile.js'], ['jshint']);
});

gulp.task('default', ['server', 'watch']);
