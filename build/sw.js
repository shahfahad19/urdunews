// Choose a cache name
const cacheName = "urdu-news-cache-v2";
// List the files to precache
const precacheResources = [
    "/",
    "/index.html",
    "/static/css/main.7f2c2f2c.css",
    "/static/js/main.db6c3a15.js",
    "/images/icons/icon-128x128.png",
    "/images/icons/icon-144x144.png",
    "/images/icons/icon-152x152.png",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-384x384.png",
    "/images/icons/icon-512x512.png",
    "/images/icons/icon-72x72.png",
    "/images/icons/icon-96x96.png",
];

// When the service worker is installing, open the cache and add the precache resources to it
self.addEventListener("install", (event) => {
    //console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName).then((cache) => cache.addAll(precacheResources))
    );
});

self.addEventListener("activate", (event) => {
    //console.log('Service worker activate event!');
});

// When there's an incoming fetch request, try and respond with a precached resource, otherwise fall back to the network
self.addEventListener("fetch", (event) => {
    //console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});
