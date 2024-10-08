// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging-compat.js"
);

// Firebase 설정 객체 (firebase.ts와 동일한 값 사용)
const firebaseConfig = {
  apiKey: "AIzaSyBlc1vfdR4lTXBZalRDoL2LLoqk_k9itsM",
  authDomain: "the-family-guardian.firebaseapp.com",
  projectId: "the-family-guardian",
  storageBucket: "the-family-guardian.appspot.com",
  messagingSenderId: "339693893957",
  appId: "1:339693893957:web:585d6f430050a0d28f262c",
  measurementId: "G-41DK0HCV9H",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // 원하는 아이콘으로 변경
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

