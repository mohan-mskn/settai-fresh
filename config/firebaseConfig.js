// config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDUsrIas-pFAn_qLyw4PWBADNpCA8vDPiA",
  authDomain: "settai.firebaseapp.com",
  projectId: "settai",
  storageBucket: "settai.appspot.com",
  messagingSenderId: "1092437432048",
  appId: "1:1092437432048:android:c08a8e76d38bd5cdeb1435"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const firestore = getFirestore(app);

export { app, auth, firestore };
