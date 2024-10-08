// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging-compat.js"
);

// Firebase 설정 객체 (firebase.ts와 동일한 값 사용)
const firebaseConfig = {
  apiKey: "AIzaSyCTHRWWL50vqyNfYQnJofsEItQxl2fgI3I",
  authDomain: "moobeing-ee0eb.firebaseapp.com",
  projectId: "moobeing-ee0eb",
  storageBucket: "moobeing-ee0eb.appspot.com",
  messagingSenderId: "830764540752",
  appId: "1:830764540752:web:aa3e3215695f7b78288255",
  measurementId: "G-2MW15Q9GCQ"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  // 포그라운드에서 이미 알림이 처리된 경우, 백그라운드에서는 알림을 표시하지 않도록 처리
  if (!document.hidden) {
    return;
  }

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

