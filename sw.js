const CACHE_NAME = 'pos-app-v1';
const urlsToCache = [
  './',
  './index.html',
  // Tambahkan file CSS dan JS Anda di bawah ini, contoh:
  // './style.css',
  // './script.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Membuka cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch/Ambil data dari Cache saat offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan cache jika ada
        }
        return fetch(event.request); // Ambil dari internet jika tidak ada di cache
      })
  );
});

// Update Cache (Hapus cache lama jika ada versi baru)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});