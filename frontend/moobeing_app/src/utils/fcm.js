// firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import useFCMStore from "../store/FCMStore";
import { postFCMRegister } from "../apis/FCMApi";
import useIsAlarm from "../store/AlarmStore";
import { getIsAlarm } from "../apis/AlarmApi";
import useAlarmStore from "../store/AlarmStore";

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

export function requestToken() {
  getToken(messaging, {
    vapidKey:
      "BKSLg2e8SNHqXlxXcufLmhbyE2IUJg3pyyG_aTt4NsLqvVopevgxg0e2jNaeXHG_vGGHbHdZklPwFlH2nOnCNfE",
  })
    .then((currentToken) => {
      if (currentToken) {
        useFCMStore.getState().setToken(currentToken);
        postFCMRegister({ token: currentToken });
      } else {
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });
}

onMessage(messaging, (payload) => {
  console.log("Message received: ", payload);
  useAlarmStore.getState().setIsAlarm(true); // 알림 수신 시 isAlarm을 true로 설정
});

