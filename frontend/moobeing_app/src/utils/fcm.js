import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import useFCMStore from "../store/FCMStore";

const config = {
  apiKey: "AIzaSyCTHRWWL50vqyNfYQnJofsEItQxl2fgI3I",
  authDomain: "moobeing-ee0eb.firebaseapp.com",
  projectId: "moobeing-ee0eb",
  storageBucket: "moobeing-ee0eb.appspot.com",
  messagingSenderId: "830764540752",
  appId: "1:830764540752:web:aa3e3215695f7b78288255",
  measurementId: "G-2MW15Q9GCQ"
};

const app = initializeApp(config);
const messaging = getMessaging();

// 토큰값 얻기
getToken(messaging, {
  vapidKey:
    "BKSLg2e8SNHqXlxXcufLmhbyE2IUJg3pyyG_aTt4NsLqvVopevgxg0e2jNaeXHG_vGGHbHdZklPwFlH2nOnCNfE",
})
  .then((currentToken) => {
    if (currentToken) {
      // 전역 상태에 currentToken 저장
      useFCMStore.getState().setToken(currentToken); // 추가된 코드
      console.log("Token:", currentToken);
      navigator.clipboard.writeText(currentToken)
        .then(() => alert("토큰이 클립보드에 복사되었습니다: " + currentToken))
        .catch(err => console.error("토큰 복사 실패:", err));
    } else {
      console.log("No registration token available. Request permission to generate one.");
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });

//포그라운드 메시지 수신
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});
