const CACHE='shiri-2b50b9f94496';
const FILES=["./","./index.html","./manifest.webmanifest","./assets/index-ChoGtMxQ.js","./assets/index-ocRAwa4s.css","./assets/web-CVgrU3N_.js","./assets/web-DJ9UGD60.js","./icon-1024.png","./icon-192.png","./icon-256.png","./icon-512.png","./icon.svg"];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('shiri-')&&k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin)return;
e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,copy)));}return r;}).catch(async()=>await caches.match(e.request)||(e.request.mode==='navigate'?await caches.match('./index.html'):Response.error())));});