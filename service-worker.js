/* 
Web Development by Yogesh S.Waradkar
Project : NGO-Website.
File Name : service-worker.js
Service worker file enables the PWA (Progressive Web App) capabilities and the functionalities. 
Date : 17-09-2025
*/

const CACHE_NAME = "ngo-cache-v1";
const urlsToCache = [
  "/ngo-website/",
  "/ngo-website/index.html",
  "/ngo-website/style.css",
  "/ngo-website/script.js",
  "/ngo-website/manifest.json",
];

// Install SW and cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch from cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
