//프로젝트 버전 확인
importScripts("https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging.js");

const config = {
  apiKey: import.meta.env.REACT_APP_FCM_APIKEY,
  authDomain: import.meta.env.REACT_APP_FCM_AUTH_DOMAIN,
  projectId: import.meta.env.REACT_APP_FCM_PROJECT_ID,
  storageBucket: import.meta.env.REACT_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
  appId: import.meta.env.REACT_APP_FCM_APP_ID,
  measurementId: import.meta.env.REACT_APP_FCM_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(config);

const messaging = firebase.messaging();

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: payload,
    icon: "/firebase-logo.png",
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});