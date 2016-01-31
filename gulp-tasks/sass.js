var config = {
    watch: 'public/scss/**/*.scss',
    paths: ['public/src/scss/app-main.scss', 'public/src/scss/webfonts/**.scss'],
    output: 'public/css/',
    name: 'app-main.css',
    excludedFiles: 'public/src/css/webfonts/**.scss',
    compileOptions: {
        'style': 'expanded', // expanded compressed
        'unixNewlines': true,
        'cacheLocation': './.sass_cache',
        'sourcemap': true
    }
};

module.exports = function (gulp, plugins) {
    return function () {
        plugins.sass('public/scss/app-main.scss',{sourcemap: true, style: 'compact'})
  //          .on('error', plugins.sass.logError)
            
            .pipe(plugins.autoprefixer("last 1 version", "> 1%", "ie 8", "ie 7"))
            .pipe(plugins.sourcemaps.write())
            .pipe(gulp.dest(config.output));
    };
};