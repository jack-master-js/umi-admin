const workboxBuild = require('workbox-build');

workboxBuild
    .injectManifest({
        swSrc: './sw.js',
        swDest: '../dist/sw.js',
        globDirectory: '../dist/',
        globPatterns: ['**/*.{html,js,css,png,jpg,gif}'],
        modifyURLPrefix: {
            '': '/',
        },
    })
    .catch(err => {
        console.error(`Unable to inject the precache manifest into sw.js`);
        throw err;
    });
