module.exports = {
    webpack: {
      resolve: {
        fallback: {
          "path": require.resolve("path-browserify"),
          "stream": require.resolve("stream-browserify"),
          "crypto": require.resolve("crypto-browserify"),
          "os": require.resolve("os-browserify"),
          "http": require.resolve("stream-http"),
          "zlib": require.resolve("browserify-zlib"),
          "querystring": require.resolve("querystring-es3"),
          "fs": false,  // Disable 'fs' since it is server-side only
          "net": false, // Disable 'net' since it is server-side only
        },
      },
    },
  };