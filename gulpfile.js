var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var Server = require('karma').Server;

gulp.task('default', ['test', 'minify']);

gulp.task('minify', function() {
    gulp.src(['src/core/*.js', 'src/externals/*.js', 'src/components/**/*Directive.js'])
        .pipe(concat('fabricui-directives.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));

    gulp.src(['src/core/*.js', 'src/externals/*.js', 'src/components/**/*Directive.js'])
        .pipe(concat('fabricui-directives.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('test', function (done) {
    new Server({
        configFile: __dirname  + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('tdd', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: false
    }, done).start();
});

