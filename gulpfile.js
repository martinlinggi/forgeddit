var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');
var nodemon = require('nodemon');
var karma = require('gulp-karma');

var del = require('del');

gulp.task('clean', function() {
    return gulp.src('./dist/*')
        .pipe(clean({force: true}));
});

// Because we use the app folder to publish to heroku
gulp.task('clean-js', function(cb) {
    del( ['./app/scripts/forgeddit.js','./app/scripts/forgeddit.js.map'], cb);
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
        .pipe(gulp.dest('dist/app/css'))
        .pipe(notify({message: 'Styles task complete'}));
});

gulp.task('scripts', ['clean-js'], function() {
    return gulp.src(['app/scripts/app.js', 'app/scripts/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(sourcemaps.init())
        .pipe(concat('forgeddit.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/app/scripts'))
        .pipe(gulp.dest('app/scripts'))
        .pipe(notify({message: 'Scripts task complete'}));
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest('dist/app/images'))
        .pipe(notify({message: 'Images task complete'}));
});

gulp.task('fonts', function () {
    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/app/fonts'));
});

gulp.task('favicon', function () {
    gulp.src('app/favicon.ico')
        .pipe(gulp.dest('dist/app'));
});

gulp.task('bower-components', function () {
    gulp.src('./app/bower_components/**')
        .pipe(gulp.dest('dist/app/bower_components'));
});

gulp.task('html-files', function () {
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('dist/app'));
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
    gulp.start('styles', 'scripts', 'images', 'bower-components', 'html-files', 'favicon', 'fonts');
});

// Runs the styles task, starts the server and restarts it automagically after changes happened
gulp.task('dev', ['styles', 'watch'], function(){
    nodemon({ script: 'server.js', ext: 'html js', ignore: ['gulpfile.js', 'test/*', 'app/*'] })
        .on('restart', function () {
            console.log('Developement-Server restarted!!');
        })
});

gulp.task('build-test', function() {
    gulp.src('./app/**')
});

var unitTestFiles = [
    'app/bower_components/angular/angular.min.js',
    'app/bower_components/angular-route/angular-route.js',
    'node_modules/angular-mocks/angular-mocks.js',
    'app/scripts/app.js',
    'app/scripts/**/*.js',
    'test/unit/**/*.js'
];

gulp.task('test-unit', function() {
    return gulp.src(unitTestFiles)
        .pipe(karma({configFile: 'karma.conf.js', action: 'run' }))
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
        .pipe(karma({configFile: 'karma-e2e.conf.js', action: 'run'}))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        })
});

gulp.task('test', ['test-unit', 'test-e2e']);

gulp.task('default', ['dev']);
