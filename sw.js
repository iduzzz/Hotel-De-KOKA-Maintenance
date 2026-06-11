self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

self.addEventListener('push', e => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch(err) {}
  const title = data.title || '🔔 Hotel De KOKA';
  const options = {
    body: data.body || 'New maintenance report',
    tag: data.tag || 'hdk-notif',
    requireInteraction: true,
    vibrate: [300, 100, 300]
  };
  e.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.openWindow('https://iduzzz.github.io/Hotel-De-KOKA-Maintenance/')
  );
});
