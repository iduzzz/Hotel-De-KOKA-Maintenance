// Hotel De KOKA — Service Worker with FCM Push Support

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});

// Handle push notifications from FCM via Cloudflare Worker
self.addEventListener('push', e => {
  let data = {};
  try { data = e.data ? e.data.json() : {}; } catch(err) {}

  const title = data.title || '🔔 Hotel De KOKA';
  const options = {
    body:             data.body || 'New maintenance report received',
    icon:             data.icon || '/Hotel-De-KOKA-Maintenance/icon.png',
    badge:            data.icon || '/Hotel-De-KOKA-Maintenance/icon.png',
    tag:              data.tag  || 'hdk-notif',
    requireInteraction: true,
    vibrate:          [300, 100, 300, 100, 300],
    data:             { url: 'https://iduzzz.github.io/Hotel-De-KOKA-Maintenance/' }
  };

  e.waitUntil(self.registration.showNotification(title, options));
});

// Open app when notification is tapped
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      for (const client of list) {
        if (client.url.includes('Hotel-De-KOKA-Maintenance') && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow('https://iduzzz.github.io/Hotel-De-KOKA-Maintenance/');
    })
  );
});
