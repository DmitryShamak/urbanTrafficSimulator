var gulp = require("gulp");

var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var notify = require('gulp-notify');
var del = require('del');
var path = require("path");
var sass = require('gulp-sass');
var util = require("gulp-util");
var change = require('gulp-change');

var stylesSrc = [
    'app/style/*.scss'
];
gulp.task('styles', function () {
    return gulp
        // Find all `.scss` files from the `stylesheets/` folder
        .src(stylesSrc)
        // Run Sass on those files
        .pipe(sass())
        .pipe(concat('style.css'))
        // Write the resulting CSS in the output folder
        .pipe(gulp.dest('dist/css'));
});

var scriptsSrc = [
    'app/js/app.js',
    'app/js/**/*js'
];
gulp.task("scripts", function() {
    return gulp.src(scriptsSrc)
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

var bowerFiles = [
    './bower_components/jquery/dist/jquery.min.js',
    './bower_components/jquery.cookie/jquery.cookie.js',
    './bower_components/bootstrap/dist/js/bootstrap.min.js',
    './bower_components/moment/min/moment.min.js',
    './bower_components/lodash/dist/lodash.min.js',
    './bower_components/angular/angular.min.js'
];
gulp.task("bower", function() {
    return gulp.src(bowerFiles)
        .pipe(concat('bower_components.js'))
        .pipe(gulp.dest('dist/js'))
        .on('error', util.log)
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(notify({ message: 'Bower task complete' }));
});

gulp.task('clean', function() {
    return del(['./dist/**']);
});

gulp.task('move_fonts',function() {
    return gulp.src([
            './bower_components/font-awesome/fonts/*'
        ])
        .pipe(gulp.dest("./dist/fonts"));
});

gulp.task('move_views',function() {
    return gulp.src('./app/view/**/*')
        .pipe(gulp.dest("./dist/view"));
});

gulp.task('move_index', function() {
    return gulp.src(['./app/index.html'])
        .pipe(gulp.dest("./dist"));
});

gulp.task('move_imgs',function() {
    return gulp.src('./app/img/**/*')
        .pipe(gulp.dest("./dist/img"));
});

gulp.task('move_files',function() {
    gulp.start('move_views', 'move_imgs');
});

// Default task
gulp.task('build', ['clean'], function() {
    gulp.start('bower', 'scripts', 'styles', "move_index", "move_files");
});