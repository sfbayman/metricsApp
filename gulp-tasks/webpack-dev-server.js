var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var gutil = require("gulp-util");

module.exports = function(gulp, plugins) {
    return function() {
// Start a webpack-dev-server
 var config = Object.create(require('../webpack.config.js'));
    config.devtool = "eval";
    config.debug = true;

    new WebpackDevServer(webpack(config), {
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
        // keep the server alive or continue?
        // callback();
    });


    };
};

