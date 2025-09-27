'use strict';

const CACHE_NAME = 'nora-cache-v1.2.0';

const urlsToCache = [
  '/Nora/',
  '/Nora/index.html',
  '/Nora/favicon.ico',
  '/Nora/manifest.json',
  '/Nora/Icons/icon-192x192.png',
  '/Nora/Icons/icon-512x512.png',
  '/Nora/Fonts/Iran Yekan Medium.ttf',
  '/Nora/Fonts/San Francisco bold.ttf'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cacheName => {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
          return caches.delete(cacheName);
        }
      })
    );
  }));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
