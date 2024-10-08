// public/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging-compat.js"
);

// Firebase 설정 객체 (firebase.ts와 동일한 값 사용)
const firebaseConfig = {
  apiKey: "AIzaSyDf2tO7gYmnvDp0nnoClfhpJah74L0_Z8s",
  authDomain: "moobeing-94714.firebaseapp.com",
  projectId: "moobeing-94714",
  storageBucket: "moobeing-94714.appspot.com",
  messagingSenderId: "897587874738",
  appId: "1:897587874738:web:6c65a9521f13b03735b2ab",
  measurementId: "G-JKBHH3EN4Y"
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
