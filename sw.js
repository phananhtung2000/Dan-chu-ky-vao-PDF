const CACHE_NAME = 'chen-chu-ky-pdf-cache-v1'; // đổi "v1" -> "v2" khi cần bust cache

const APP_SHELL = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Chỉ xử lý GET tới tài nguyên tĩnh của app shell / CDN.
  // KHÔNG bắt hết mọi request — request nào không nằm trong app shell / CDN
  // đã khai báo thì để trình duyệt xử lý bình thường, không can thiệp vào
  // bất kỳ luồng đọc/ghi localStorage nào của phần mềm (localStorage không
  // đi qua fetch handler, nhưng vẫn giữ nguyên tắc chỉ đụng tài nguyên tĩnh).
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => res)
        .catch(() => {
          // Offline và không có trong cache -> fallback về index.html
          if (req.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
