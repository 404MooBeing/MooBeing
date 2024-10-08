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

// 중복 알림을 방지하기 위한 Set
const notificationIds = new Set();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // 고유한 알림 ID 생성 (예: 타임스탬프 + 제목)
  const notificationId = `${Date.now()}-${payload.notification.title}`;

  // 이미 표시된 알림인지 확인
  if (!notificationIds.has(notificationId)) {
    notificationIds.add(notificationId);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: "/firebase-logo.png", // 원하는 아이콘으로 변경
      tag: notificationId, // 알림에 고유 태그 추가
    };

    self.registration.showNotification(notificationTitle, notificationOptions);

    // 일정 시간 후 Set에서 알림 ID 제거 (예: 10초 후)
    setTimeout(() => {
      notificationIds.delete(notificationId);
    }, 1000);
  }
});