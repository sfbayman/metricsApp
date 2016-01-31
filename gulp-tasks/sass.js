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
        plugins.sass('public/scss/app-main.scss',{ sourcemap: 'inline' })
            .on('error', plugins.sass.logError)
            .pipe(plugins.autoprefixer())
            .pipe(gulp.dest(config.output));
    };
};