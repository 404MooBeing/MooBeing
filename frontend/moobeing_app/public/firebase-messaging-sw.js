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

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 기존 알림 닫기 이벤트 리스너 등록
self.addEventListener("notificationclose", () => {
  console.log("이전 알림이 닫혔습니다.");
});

// background message 수신 처리
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // 새 알림 표시
  self.registration.showNotification(notificationTitle, notificationOptions);

  self.addEventListener("notificationclick", function (event) {
    console.log("notification click");
    const url = "/";
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
  });
});
