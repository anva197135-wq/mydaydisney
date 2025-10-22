const CACHE_NAME = 'mk-plan-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/bundle.js',
  '/icon-192.png',
  '/icon-512.png'
];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))));
  self.skipWaiting();
});
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
