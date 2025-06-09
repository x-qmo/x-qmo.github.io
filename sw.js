importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  // Mengaktifkan log debug Workbox (opsional)
  // workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

  // 1. Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    })
  );

  // 2. Cache the underlying font files with a cache-first strategy for 1 year.
  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    new workbox.strategies.CacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxAgeSeconds: 60 * 60 * 24 * 365,
          maxEntries: 30,
        }),
      ],
    })
  );

  // 3. Cache images with a cache-first strategy.
  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg|webp)$/,
    new workbox.strategies.CacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );

  // 4. Cache CSS, JS, and HTML with a stale-while-revalidate strategy.
  workbox.routing.registerRoute(
    /\.(?:css|js|html)$/,
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-assets',
    })
  );

  // 5. Cache API calls (if any, e.g., for comments, search)
  // Example: If you fetch data from /api/posts
  // workbox.routing.registerRoute(
  //   /\/api\//,
  //   new workbox.strategies.NetworkFirst({
  //     cacheName: 'api-data',
  //     plugins: [
  //       new workbox.expiration.ExpirationPlugin({
  //         maxEntries: 20,
  //         maxAgeSeconds: 5 * 60, // 5 minutes
  //       }),
  //     ],
  //   })
  // );

  // Precache all pages and assets explicitly (important for Jekyll generated pages)
  // This part is tricky with Jekyll. You might need to generate this list dynamically.
  // For a static list, you'd list out your pages, CSS, JS, etc.
  // Example of explicit precaching (you'll need to generate this for your Jekyll site):
  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' }, // Jekyll generates index.html
    { url: '/tentang/', revision: '1' }, // Example page
    // Add more important pages/posts you want to be offline
    '/assets/css/style.css',
    '/assets/js/',
    // Don't forget your manifest file and icons
    '/manifest.json',
    '/assets/images/logo192x192.png',
    '/assets/images/logo512x512.png',
    '/assets/images/maskable_icon.png'
  ]);

  // Mengatur rute fallback untuk offline
  workbox.routing.setCatchHandler(async ({event}) => {
    // The fallback HTML page is the most important part for offline experience
    // Make sure you have an actual offline.html page
    if (event.request.mode === 'navigate') {
      return caches.match('/offline.html'); // Ensure you have an offline.html page
    }
    // For other types of requests, we might return a different fallback
    return Response.error(); // Or a default image, etc.
  });

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
