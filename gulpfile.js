var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var minifycss = require('gulp-minify-css');
//var jshint = require('gulp-jshint');
//var uglify = require('gulp-uglify');
//var imagemin = require('gulp-imagemin');
//var concat = require('gulp-concat');
var notify = require('gulp-notify');
//var cache = require('gulp-cache');
//var livereload = require('gulp-livereload');
//var sourcemaps = require('gulp-sourcemaps');
//var clean = require('gulp-clean');

// var connect = require('gulp-connect');
// var concat = require('gulp-concat');

gulp.task('clean', function() {
    return gulp.src('./dist/*')
        .pipe(clean({force: true}));
});

gulp.task('styles', function(){
    return gulp.src('app/styles/main.scss')
        .pipe(sass({style: 'expanded'}))
        .pipe(gulp.dest('app/css'))
        .pipe(gulp.dest('dist/app/css'))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/app/css'))
        .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('scripts', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({message: 'Images task complete'}));
});

gulp.task('bower-components', function () {
    gulp.src('./app/bower_components/**')
        .pipe(gulp.dest('dist/bower_components'));
});

gulp.task('html-files', function () {
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
    gulp.watch('app/**/*.html', ['html-files']);
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
});

gulp.task('build', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'bower-components', 'html-files');
});

gulp.task('connect', function() {
    connect.server( {root: 'app/', port: 8888});
});

gulp.task('connectDist', function() {
    connect.server( {root: 'dist/', port: 9999});
});

gulp.task('default', ['connect']);
