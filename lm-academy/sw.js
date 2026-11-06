/* The Slip — offline support. Bump VERSION whenever app files change. */
const VERSION = "the-slip-v7";
const SHELL = [
  "./",
  "index.html",
  "css/app.css",
  "js/course.js",
  "js/modules/m01.js",
  "js/modules/m02.js",
  "js/modules/m03.js",
  "js/modules/m04.js",
  "js/modules/m05.js",
  "js/modules/m06.js",
  "js/modules/m07.js",
  "js/modules/m08.js",
  "js/modules/m09.js",
  "js/modules/m10.js",
  "js/modules/m11.js",
  "js/modules/m12.js",
  "js/modules/m13.js",
  "js/modules/m14.js",
  "js/modules/m15.js",
  "js/glossary.js",
  "js/explore.js",
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
