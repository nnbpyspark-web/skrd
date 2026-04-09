// Service Worker for Sri Kanugonda Raya Swami Temple PWA
const CACHE_NAME = 'krs-temple-v1';
const STATIC_ASSETS_CACHE = 'krs-static-v1';
const IMAGE_CACHE = 'krs-images-v1';

// Pages to pre-cache (offline first)
const PRECACHE_PAGES = [
  '/',
  '/timings/',
  '/contact/',
  '/about/',
  '/sevas/',
  '/gallery/',
  '/donate/',
  '/offline/',
];

// Static assets to pre-cache
const STATIC_ASSETS = [
  '/manifest.json',
];

// Install event - pre-cache critical pages and assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(PRECACHE_PAGES).catch((err) => {
          console.warn('Some pages failed to pre-cache:', err);
        });
      }),
      caches.open(STATIC_ASSETS_CACHE).then((cache) => {
        return cache.addAll(STATIC_ASSETS).catch((err) => {
          console.warn('Some assets failed to pre-cache:', err);
        });
      }),
    ])
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => 
            name !== CACHE_NAME && 
            name !== STATIC_ASSETS_CACHE && 
            name !== IMAGE_CACHE
          )
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - handle requests with appropriate caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) return;

  // Image caching strategy: cache-first
  if (
    request.destination === 'image' ||
    url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/)
  ) {
    event.respondWith(cacheFirstStrategy(event.request, IMAGE_CACHE));
    return;
  }

  // Static assets: cache-first
  if (
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'font' ||
    url.pathname.match(/\.(css|js|woff|woff2|ttf|eot)$/)
  ) {
    event.respondWith(cacheFirstStrategy(event.request, STATIC_ASSETS_CACHE));
    return;
  }

  // HTML pages: stale-while-revalidate
  if (request.destination === 'document' || request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(staleWhileRevalidateStrategy(event.request, CACHE_NAME));
    return;
  }
});

// Cache-first strategy (for images and static assets)
async function cacheFirstStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Return a fallback for images
    if (request.destination === 'image') {
      return new Response(
        '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="#fff8f0" width="100" height="100"/><text y=".9em" font-size="60" x="50%" text-anchor="middle">🕉</text></svg>',
        { headers: { 'Content-Type': 'image/svg+xml' } }
      );
    }
    throw error;
  }
}

// Stale-while-revalidate strategy (for pages)
async function staleWhileRevalidateStrategy(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  // Fetch in background to update cache
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => null);

  // Return cached if available, otherwise wait for network
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetchPromise;
    if (networkResponse) return networkResponse;
  } catch (error) {
    // fall through to offline page
  }

  // Return offline page if available
  const offlinePage = await cache.match('/offline/');
  if (offlinePage) return offlinePage;

  return new Response('You are offline. Please check your internet connection.', {
    headers: { 'Content-Type': 'text/html' },
    status: 503,
  });
}
