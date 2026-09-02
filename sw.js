const CACHE='meucep-v31-premium-20260901';
const APP=['./','./index.html','./manifest.json','./sw.js','./logo.png','./logo-horizontal.png','./apple-touch-icon.png',
'./icons/icon-72.png','./icons/icon-96.png','./icons/icon-128.png','./icons/icon-144.png','./icons/icon-152.png',
'./icons/icon-180.png','./icons/icon-192.png','./icons/icon-192-maskable.png','./icons/icon-384.png','./icons/icon-512.png','./icons/icon-512-maskable.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('meucep-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin===location.origin)e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{if(x.ok){const c=x.clone();caches.open(CACHE).then(k=>k.put(e.request,c))}return x}).catch(()=>caches.match('./index.html'))))});
