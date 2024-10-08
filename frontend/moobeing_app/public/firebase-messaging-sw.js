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

// 중복된 알림 방지 로직 추가
let lastNotificationData = null;
let lastNotificationTimestamp = 0;
const THROTTLE_TIME = 1000; // 알림 중복 제한 시간 (밀리초 단위)

// background 메시지 처리
messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload);

  const currentTime = Date.now();
  const notificationData = JSON.stringify(payload.notification);

  // 중복 확인: 같은 알림이고 설정된 시간 내일 경우 표시하지 않음
  if (lastNotificationData === notificationData && (currentTime - lastNotificationTimestamp) < THROTTLE_TIME) {
    return;
  }

  // 알림 표시 및 마지막 알림 정보 업데이트
  lastNotificationData = notificationData;
  lastNotificationTimestamp = currentTime;

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // 원하는 아이콘으로 변경
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
