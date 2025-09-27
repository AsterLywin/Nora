'use strict';

const CACHE_NAME = 'nora-cache-v3';

const urlsToCache = [
  '/Nora/',
  '/Nora/index.html',
  '/Nora/favicon.ico',
  '/Nora/manifest.json',
  '/Nora/icons/icon-192x192.png',
  '/Nora/icons/icon-512x512.png',
  '/Nora/Fonts/Iran Yekan Medium.ttf',
  '/Nora/Fonts/San Francisco bold.ttf'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching files');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
