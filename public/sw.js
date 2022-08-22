const cacheName = "urdu-news-cache-v5";
const precacheResources = ["/"];

self.addEventListener("install", (event) => {
    //console.log("Service worker installed!");
    event.waitUntil(
        caches.open(cacheName).then((cache) => cache.addAll(precacheResources))
    );
});

self.addEventListener("activate", (event) => {
    //console.log("Service worker activated");
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});
