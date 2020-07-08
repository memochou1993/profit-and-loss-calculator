self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("store").then((cache) => {
      return cache.addAll([
        "/profit-and-loss-calculator",
        "/profit-and-loss-calculator/index.html",
        "/profit-and-loss-calculator/css/bootstrap.min.css",
        "/profit-and-loss-calculator/css/app.css",
        "/profit-and-loss-calculator/js/jquery.min.js",
        "/profit-and-loss-calculator/js/bootstrap.min.js",
        "/profit-and-loss-calculator/js/app.js",
        "/profit-and-loss-calculator/images/repository.png",
      ]);
    })
  );
});
