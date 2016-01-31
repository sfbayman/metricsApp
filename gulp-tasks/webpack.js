var webpackStream = require('webpack-stream');

module.exports = function(gulp, plugins) {
    return function() {
      		gulp.src('public/js/main.jsx')
      		.pipe(plugins.sourcemaps.init())
            .pipe(webpackStream( require('../webpack.config.js') ))
            .pipe(plugins.uglify())
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest('public/js/dist/'));
    };
};