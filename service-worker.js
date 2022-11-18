self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("store").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/css/bootstrap.min.css",
        "/css/app.css",
        "/js/jquery.min.js",
        "/js/bootstrap.min.js",
        "/js/app.js",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
