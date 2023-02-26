import { precacheAndRoute } from 'workbox-precaching';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute, Route } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { offlineFallback } from 'workbox-recipes';

precacheAndRoute(self.__WB_MANIFEST);

// Create a CacheFirst strategy for the page cache
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm up the page cache for specific URLs
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Handle offline fallback for page requests
offlineFallback({
  pageFallback: '/index.html'
});

// Register a route for navigation requests
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Handle asset caching
// Handle images with a StaleWhileRevalidate strategy
registerRoute(
  ({ request }) => request.destination === 'image',
  new StaleWhileRevalidate({
    cacheName: 'images'
  })
);

// Handle scripts with a CacheFirst strategy
registerRoute(
  ({ request }) => request.destination === 'script',
  new CacheFirst({
    cacheName: 'scripts'
  })
);

// Handle styles with a CacheFirst strategy
registerRoute(
  ({ request }) => request.destination === 'style',
  new CacheFirst({
    cacheName: 'styles'
  })
);