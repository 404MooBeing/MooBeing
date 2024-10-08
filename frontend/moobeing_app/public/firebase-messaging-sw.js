importScripts(
  "https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging-compat.js"
);

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

// 마지막 알림 시간을 저장할 변수
let lastNotificationTime = 0;
// 알림 간 최소 간격 (밀리초)
const MIN_NOTIFICATION_INTERVAL = 500; // 500ms

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const currentTime = Date.now();

  if (payload.notification && currentTime - lastNotificationTime >= MIN_NOTIFICATION_INTERVAL) {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "/firebase-logo.png",
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
    lastNotificationTime = currentTime;
  } else {
    console.log("알림 간격이 너무 짧아 무시됨");
  }
});
