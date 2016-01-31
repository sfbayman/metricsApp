var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

var plugins = require('gulp-load-plugins')({
    rename: {
    	'pattern': ['gulp-*', 'gulp.*'],
      'gulp-ruby-sass': 'sass',
      'scope': ['dependencies', 'devDependencies', 'peerDependencies'],
      'config': 'package.json'
    }
});

function getTask(task) {
    return require('./gulp-tasks/' + task)(gulp, plugins);
}

function build() {
	console.log("build successfully completed")
}

gulp.task('clean', function() {
    return del(["public/js/dist"]);
});

gulp.task('sass', getTask('sass'));
gulp.task('webpack', getTask('webpack'));
gulp.task('webpack-dev-server', getTask('webpack-dev-server'));

gulp.task('default', ['sass','webpack', 'webpack-dev-server'], function() {
    gulp.watch('public/scss/**/*.scss', ['sass']);
});

gulp.task('build', function() {
  runSequence('clean',['sass', 'webpack']);
});