/* The Slip — offline support. Bump VERSION whenever app files change. */
const VERSION = "the-slip-v9";
const SHELL = [
  "./",
  "index.html",
  "css/app.css",
  "js/glossary.js",
  "js/kit.js",
  "js/chapters/c01.js",
  "js/chapters/c02.js",
  "js/chapters/c03.js",
  "js/chapters/c04.js",
  "js/chapters/c05.js",
  "js/chapters/c06.js",
  "js/chapters/c07.js",
  "js/chapters/c08.js",
  "js/chapters/c09.js",
  "js/chapters/c10.js",
  "js/chapters/c11.js",
  "js/chapters/c12.js",
  "js/chapters/c13.js",
  "js/chapters/c14.js",
  "js/chapters/c15.js",
  "js/chapters/c16.js",
  "js/chapters/c17.js",
  "js/chapters/c18.js",
  "js/chapters/c19.js",
  "js/chapters/c20.js",
  "js/chapters/c21.js",
  "js/chapters/c22.js",
  "js/chapters/c23.js",
  "js/chapters/c24.js",
  "js/chapters/c25.js",
  "js/chapters/c26.js",
  "js/chapters/c27.js",
  "js/chapters/c28.js",
  "js/app.js",
  "manifest.webmanifest",
  "icons/icon.svg",
  "icons/apple-touch-icon.png",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  if (url.origin !== self.location.origin) return;

  // Navigations: serve the cached shell when offline.
  if (req.mode === "navigate") {
    event.respondWith(fetch(req).catch(() => caches.match("index.html")));
    return;
  }

  // App files: serve from cache, refresh in the background.
  event.respondWith(
    caches.open(VERSION).then((cache) =>
      cache.match(req).then((hit) => {
        const fresh = fetch(req)
          .then((res) => { if (res.ok) cache.put(req, res.clone()); return res; })
          .catch(() => hit);
        return hit || fresh;
      })
    )
  );
});
