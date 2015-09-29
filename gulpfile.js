var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var Server = require('karma').Server;

gulp.task('default', ['test', 'minify']);

gulp.task('minify', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('fabricui-directives.js'))
        .pipe(uglify())
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
        singleRun: true
    }, done).start();
});

