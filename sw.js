const CACHE='yushi-m-3c28cdd1014f';
const FILES=["./","./index.html","./manifest.webmanifest","./assets/index-8x2J5L-R.css","./assets/index-CT2DEYmT.js","./apple-touch-icon.png","./icon-192.png","./icon-512.png","./icon-maskable-512.png","./icon.svg"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)));});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('yushi-m-')&&k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==self.location.origin)return;
e.respondWith(fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,copy)));}return r;}).catch(async()=>await caches.match(e.request)||(e.request.mode==='navigate'?await caches.match('./index.html'):Response.error())));});
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{};}catch{d={title:e.data&&e.data.text()};}
e.waitUntil(self.registration.showNotification(d.title||'昱时提醒',{body:d.body||'',tag:d.tag,icon:'./icon-192.png',badge:'./icon-192.png',data:{date:d.date||''}}));});
self.addEventListener('notificationclick',e=>{e.notification.close();const date=e.notification.data&&e.notification.data.date;const target=new URL('./'+(date?'#date='+date:''),self.registration.scope).href;
e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{for(const c of list){if('focus' in c){c.navigate&&c.navigate(target).catch(()=>{});return c.focus();}}return self.clients.openWindow(target);}));});
