var gulp = require('gulp');
var del = require('del');
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

gulp.task('clean', function() {
    return del(["node_modules"]);
});

gulp.task('sass', getTask('sass'));
gulp.task('webpack', getTask('webpack'));
gulp.task('webpack-dev-server', getTask('webpack-dev-server'));

gulp.task('default', ['sass'], function() {
    gulp.watch('src/sass/**/*.{sass,scss}', ['sass']);
});