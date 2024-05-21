/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyC8pHz8nDnWMbzFE4IQ4rJ9RE-gL-8ec8M',
  authDomain: 'growiary-v2.firebaseapp.com',
  projectId: 'growiary-v2',
  storageBucket: 'growiary-v2.appspot.com',
  messagingSenderId: '887385376099',
  appId: '1:887385376099:web:1c90a2b01dc9127c503f56',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

self.addEventListener('notificationclick', event => {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow('/');
      }),
  );
});

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    image: payload.notification.image,
    icon: '/assets/icons/pwa/icon512_rounded.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
