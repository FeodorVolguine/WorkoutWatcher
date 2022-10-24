import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectID,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderID,
  appId: Constants.manifest?.extra?.firebaseAppID
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//export const googleAuthProvider = new GoogleAuthProvider();