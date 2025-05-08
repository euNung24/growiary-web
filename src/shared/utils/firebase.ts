import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const messageFn = async () => {
  const messaging = getMessaging(app);

  getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VALID_KEY,
  }).then(currentToken => {
    if (currentToken) {
      // 정상적으로 토큰이 발급되면 콘솔에 출력합니다.
      console.log(currentToken);
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
  });

  onMessage(messaging, payload => {
    console.log('Message received. ', payload);
  });
};

export function requestPermission() {
  console.log('Requesting permission...');
  if ('Notification' in window) {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('denied');
      }
    });
  }
}

isSupported().then(isSupported => {
  isSupported && messageFn();
});
