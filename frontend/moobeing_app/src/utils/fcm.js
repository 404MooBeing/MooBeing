import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import useFCMStore from "../store/FCMStore";

const config = {
  apiKey: "AIzaSyDf2tO7gYmnvDp0nnoClfhpJah74L0_Z8s",
  authDomain: "moobeing-94714.firebaseapp.com",
  projectId: "moobeing-94714",
  storageBucket: "moobeing-94714.appspot.com",
  messagingSenderId: "897587874738",
  appId: "1:897587874738:web:6c65a9521f13b03735b2ab",
  measurementId: "G-JKBHH3EN4Y"
};

const app = initializeApp(config);
const messaging = getMessaging();

// 토큰값 얻기
getToken(messaging, {
  vapidKey:
    "BGvIwfXXUWwvAoq56A2dp8iFU5k6PqxJ1c8CP9jmbvj7yrYX1KOO3AVsiZCSupVzZOHjN_MkWI-_lk-tlVdPKzo",
})
  .then((currentToken) => {
    if (currentToken) {
      // 전역 상태에 currentToken 저장
      useFCMStore.getState().setToken(currentToken); // 추가된 코드
      console.log("Token:", currentToken);
    //   navigator.clipboard.writeText(currentToken)
    //     .then(() => alert("토큰이 클립보드에 복사되었습니다: " + currentToken))
    //     .catch(err => console.error("토큰 복사 실패:", err));
    } else {
      console.log("No registration token available. Request permission to generate one.");
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
  });
