importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js',
);

if (workbox) {
    console.log(`Yay! workbox is loaded 🎉`);

    //routing
    workbox.routing.registerRoute(
        '/',
        new workbox.strategies.StaleWhileRevalidate(),
    );
    workbox.routing.registerRoute(
        '/home',
        new workbox.strategies.StaleWhileRevalidate(),
    );

    workbox.routing.registerRoute(
        '/about',
        new workbox.strategies.StaleWhileRevalidate(),
    );

    //no: only get method can be cached
    // workbox.routing.registerRoute(
    //   new RegExp('^/api/.+'),
    //   new workbox.strategies.StaleWhileRevalidate()
    // )

    //precaching
    workbox.precaching.precacheAndRoute([]);
} else {
    console.log(`Boo! workbox didn't load 😬`);
}
