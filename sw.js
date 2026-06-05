self.addEventListener('push', e => {
  const d = e.data ? e.data.json() : {};
  e.waitUntil(self.registration.showNotification(d.title || 'Hotel De KOKA', {
    body: d.body || 'New maintenance report',
    icon: d.icon || '',
    tag: d.tag || 'hdk-notif',
    requireInteraction: true,
    vibrate: [200, 100, 200]
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('https://iduzzz.github.io/Hotel-De-KOKA-Maintenance/'));
});

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
