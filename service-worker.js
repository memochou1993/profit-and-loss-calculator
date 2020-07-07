self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('store').then((cache) => {
      return cache.addAll([
        '/index.html',
        '/app.js',
        '/app.css',
      ]);
    })
  );
 });
 