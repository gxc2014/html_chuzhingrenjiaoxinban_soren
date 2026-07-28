// 简单的 Service Worker，缓存当前页面以便离线使用
const CACHE_NAME = 'gushi-v1';
const urlsToCache = [
  'html_chuzhingrenjiaoxinban_soren.html',
  'manifest.json',
  // 如果有其他资源（CSS/JS/图标）也加入缓存
  'icons.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
