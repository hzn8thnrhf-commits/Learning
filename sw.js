/* Simple offline cache for the app shell + PDF.js library. */
const CACHE = "pdf-flow-reader-v1";
const ASSETS = [
  "./",
  "index.html",
  "css/style.css",
  "js/app.js",
  "manifest.webmanifest",
  "icons/icon-180.png",
  "icons/icon-512.png",
  "js/vendor/pdf.min.js",
  "js/vendor/pdf.worker.min.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(
      (hit) =>
        hit ||
        fetch(e.request).then((res) => {
          if (res.ok && e.request.url.startsWith(self.location.origin)) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
    )
  );
});
