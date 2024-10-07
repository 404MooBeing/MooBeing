// ✅ src/core/notification/settingFCM.ts
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
import { getToken } from "firebase/messaging"; // getToken 함수 추가
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: import.meta.env.REACT_APP_FCM_API_KEY,
  authDomain: import.meta.env.REACT_APP_FCM_AUTH_DOMAIN,
  projectId: import.meta.env.REACT_APP_FCM_PROJECT_ID,
  storageBucket: import.meta.env.REACT_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
  appId: import.meta.env.REACT_APP_FCM_APP_ID,
  measurementId: import.meta.env.REACT_APP_FCM_MEASUREMENT_ID,
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);
const analytics = getAnalytics(app);

async function getFirebaseToken() {
    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.VAPID_KEY, // 문자열에서 변수로 수정
      });
 
      if (token) {
        localStorage.setItem("fcmToken", token);
        setting(token);
      } else {
        setPushEnabled(false);
        return null;
      }
    } catch (error) {
      console.error("Error getting token: ", error);
      setPushEnabled(false);
      return null;
    }
  }
  
  const setting = (token) => {
    const body = {
      token : token
    };
    customAxios.post("/fcm", body)
    .then((res)=>{
      toast.success("푸시 알림을 받습니다", {
        duration: 1000,
      });
      setTimeout(() => {
      }, 1000);
    })
    .catch((res)=>{
      setPushEnabled(false);
    })
  }