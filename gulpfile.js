var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
//var minifycss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
//var uglify = require('gulp-uglify');
//var imagemin = require('gulp-imagemin');
//var concat = require('gulp-concat');
var notify = require('gulp-notify');
//var cache = require('gulp-cache');
var livereload = require('gulp-livereload');
//var sourcemaps = require('gulp-sourcemaps');
//var clean = require('gulp-clean');
var nodemon = require('nodemon');
var karma = require('gulp-karma');

// var connect = require('gulp-connect');
// var concat = require('gulp-concat');

gulp.task('clean', function() {
    return gulp.src('./dist/*')
        .pipe(clean({force: true}));
});

gulp.task('styles', function(){
    return gulp.src('app/styles/main.scss')
        .pipe(sass({
            style: 'compact',
            sourcemap: true,
            sourcemapPath: '../styles',
            precision: 10
            }))
        .pipe(gulp.dest('app/css'))
        .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('scripts', function() {
    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
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
    livereload.listen();
    gulp.watch('app/styles/**/*.scss', ['styles']);
    gulp.watch('app/css/**/*.css').on('change', livereload.changed);
    gulp.watch('app/**/*.html', ['html-files']).on('change', livereload.changed);
    gulp.watch('app/scripts/**/*.js', ['scripts']).on('change', livereload.changed);
    gulp.watch('app/images/**/*', ['images']).on('change', livereload.changed);
});

gulp.task('build', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images', 'bower-components', 'html-files');
});

// Runs the styles task, starts the server and restarts it automagically after changes happened
gulp.task('dev', ['styles', 'watch'], function(){
    nodemon({ script: 'server.js', ext: 'html js', ignore: ['gulpfile.js', 'test/*', 'app/*'] })
        .on('restart', function () {
            console.log('Developement-Server restarted!!');
        })
});

var unitTestFiles = [
    'app/bower_components/angular/angular.js',
    'app/bower_components/angular-route/angular-route.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'app/scripts/app.js',
    'app/scripts/**/*.js',
    'test/unit/**/*.js'
];

gulp.task('test-unit', function() {
    return gulp.src(unitTestFiles)
        .pipe(karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        })
});

var e2eTestFiles = [
    'test/e2e/**/*.js'
];

gulp.task('test-e2e', function() {
    return gulp.src(e2eTestFiles)
        .pipe(karma({
            configFile: 'karma-e2e.conf.js',
            action: 'run'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        })
});

gulp.task('test', ['test-unit', 'test-e2e']);

gulp.task('connect', function() {
    connect.server( {root: 'app/', port: 8888});
});

gulp.task('connectDist', function() {
    connect.server( {root: 'dist/', port: 9999});
});

gulp.task('default', ['connect']);
