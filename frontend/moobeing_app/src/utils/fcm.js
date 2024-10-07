import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

//토큰값 얻기
getToken(messaging, {
  vapidKey:
    "BKSLg2e8SNHqXlxXcufLmhbyE2IUJg3pyyG_aTt4NsLqvVopevgxg0e2jNaeXHG_vGGHbHdZklPwFlH2nOnCNfE", // 문자열에서 변수로 수정
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