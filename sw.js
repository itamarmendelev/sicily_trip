const V='sicily-v3',D='sicily-data',SHELL=['./','index.html','css/styles.css','js/app.js','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png','icons/icon-180.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL))));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V&&x!==D).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
if(u.pathname.includes('/data/'))e.respondWith(fetch(r).then(x=>{if(x.ok){const y=x.clone();caches.open(D).then(c=>c.put(r,y))}return x}).catch(()=>caches.match(r)));
else e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r)))});
