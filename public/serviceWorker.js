const CACHE_NAME = 'attribution-service-v1';
const urlsToCache = [
  '/iu5_5semester_frontend/',
  '/iu5_5semester_frontend/index.html',
  '/iu5_5semester_frontend/static/js/bundle.js',
  '/iu5_5semester_frontend/static/css/main.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match('/iu5_5semester_frontend/index.html')
        .then((response) => {
          return response || fetch(event.request);
        })
    );
    return;
  }

  // Для остальных запросов - стандартная логика
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});