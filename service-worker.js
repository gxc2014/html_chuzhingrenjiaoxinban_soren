const CACHE_NAME = 'gushi-v2';

const urlsToCache = [
  'html_chuzhingrenjiaoxinban_soren.html',
  'manifest.json',
  'icons.png'
];


// 安装
self.addEventListener('install', event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});


// 激活，删除旧缓存
self.addEventListener('activate', event => {

  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if(key !== CACHE_NAME){
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();

});


// 网络优先，失败使用缓存
self.addEventListener('fetch', event => {

  event.respondWith(

    fetch(event.request)
      .then(response => {

        let clone = response.clone();

        caches.open(CACHE_NAME)
          .then(cache => {
            cache.put(event.request, clone);
          });

        return response;

      })
      .catch(() => {
        return caches.match(event.request);
      })

  );

});
