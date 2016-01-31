var gulp = require('gulp');
var run = require('run-sequence');
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

gulp.task('sass', getTask('sass'));

gulp.task('default', ['sass'], function() {
    gulp.watch('src/sass/**/*.{sass,scss}', ['sass']);
});