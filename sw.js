// 家庭帳本 service worker：讓 App 可離線開啟
const VERSION = "ledger-v2";
const SHELL = ["./", "./index.html", "./firebase-config.js", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const isPage = req.mode === "navigate";
  const isLib = /cdnjs\.cloudflare\.com|fonts\.(googleapis|gstatic)\.com|www\.gstatic\.com/.test(url.host);
  if (url.origin !== location.origin && !isLib) return;
  if (isPage || (url.origin === location.origin && !/\.png$/.test(url.pathname))) {
    // 網頁與設定檔：先抓最新版，沒網路時用快取
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(isPage ? "./index.html" : req, copy)); return res; })
      .catch(() => caches.match(isPage ? "./index.html" : req)));
    return;
  }
  // 圖示、圖表元件、字型：先用快取，背景更新
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(res => { if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); } return res; }).catch(() => hit);
    return hit || net;
  }));
});
