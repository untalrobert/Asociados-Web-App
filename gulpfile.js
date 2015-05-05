var gulp =  require('gulp')
var minifyCss = require('gulp-minify-css')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var usemin = require('gulp-usemin');
var replace = require('gulp-replace');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var less = require('gulp-less');
var stylus = require('gulp-stylus');

gulp.task('panel-replace', ['panel-usemin'], function() {
    return gulp.src(['apps/panel/templates/build/panel.html'])
        .pipe(replace(/\/static\//g, '{{STATIC_URL}}'))
        .pipe(replace(/<script src="http:\/\/localhost:35729\/livereload\.js\?snipver=1"><\/script>/g, ''))
        .pipe(gulp.dest('apps/panel/templates/build/'));
});

gulp.task('panel-usemin', function() {
    return gulp.src('apps/panel/templates/dev/panel.html')
        .pipe(usemin({
            assetsDir: 'apps/panel/',
            outputRelativePath:  '../../',
            css: [minifyCss(), 'concat'],
            js: [uglify({mangle:false}),]
        }))
        .pipe(gulp.dest('apps/panel/templates/build/'));
});

gulp.task('landing-replace', ['landing-usemin'], function() {
    return gulp.src(['apps/landing/templates/build/landing.html'])
        .pipe(replace(/\/static\//g, '{{STATIC_URL}}'))
        .pipe(replace(/<script src="http:\/\/localhost:35729\/livereload\.js\?snipver=1"><\/script>/g, ''))
        .pipe(gulp.dest('apps/landing/templates/build/'));
});

gulp.task('landing-usemin', function() {
    return gulp.src('apps/landing/templates/dev/landing.html')
        .pipe(usemin({
            assetsDir: 'apps/landing/',
            outputRelativePath:  '../../',
            css: [minifyCss(), 'concat'],
            js: [uglify({mangle:false}),]
        }))
        .pipe(gulp.dest('apps/landing/templates/build/'));
});

//panel
gulp.task('panel', function(){
    livereload.listen();
    gulp.src('apps/panel/static/panel/css/*.less')
        .pipe(watch('apps/panel/static/panel/css/*.less'))
        .pipe(less())
        .pipe(gulp.dest('apps/panel/static/panel/css/'))
        .pipe(livereload());
});

// landing 

gulp.task('landing-style', function () {
    gulp.src('apps/landing/static/landing/css/*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('apps/landing/static/landing/css/'))
        .pipe(livereload());
});

gulp.task('landing-watch', function() {
    livereload.listen();
    gulp.watch('apps/landing/static/landing/css/*.styl', ['landing-style']).on('change', livereload.changed)
    gulp.watch('apps/landing/templates/**/*.html', ['landing-style']).on('change', livereload.changed);
});


gulp.task('production', ['panel-replace', 'landing-replace']);

gulp.task('admin', ['panel']);
gulp.task('landing', ['landing-watch']);

