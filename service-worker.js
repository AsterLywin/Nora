const CACHE_NAME = 'nora-cache-v3';
const urlsToCache = [
  '/Nora/', '/Nora/index.html', '/Nora/favicon.ico', '/Nora/manifest.json',
  '/Nora/icons/icon-192x192.png', '/Nora/icons/icon-512x512.png',
  '/Nora/Fonts/Iran Yekan Medium.ttf', '/Nora/Fonts/San Francisco bold.ttf'
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache))); });
self.addEventListener('fetch', e => { e.respondWith(caches.match(e.request).then(r => r || fetch(e.request))); });
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME];
  e.waitUntil(caches.keys().then(names => Promise.all(names.map(name => {
    if (cacheWhitelist.indexOf(name) === -1) return caches.delete(name);
  }))));
});
