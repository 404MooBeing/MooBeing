import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

//토큰값 얻기
getToken(messaging, {
  vapidKey:
    "BGvIwfXXUWwvAoq56A2dp8iFU5k6PqxJ1c8CP9jmbvj7yrYX1KOO3AVsiZCSupVzZOHjN_MkWI-_lk-tlVdPKzo", // 문자열에서 변수로 수정
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log(currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

//포그라운드 메시지 수신
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});