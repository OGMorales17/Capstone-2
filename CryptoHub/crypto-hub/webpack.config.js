

module.exports = {
    resolve: {
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false
            // "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
        },
    }
}

/**
Links for info
https://dev.to/marcinwosinek/how-to-add-resolve-fallback-to-webpack-5-in-nextjs-10-i6j
https://webpack.js.org/configuration/
https://github.com/facebook/create-react-app/issues/11756
https://stackoverflow.com/questions/43589964/how-to-downgrade-version-of-webpack/43590141
https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
https://webpack.js.org/configuration/resolve/
https://hashinteractive.com/blog/complete-guide-to-webpack-configuration-for-react/

 */