import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAXC-Liel-SMGGAcaV6GT7waG2i7RJnJWQ",
    authDomain: "workoutwatcher-94d08.firebaseapp.com",
    projectId: "workoutwatcher-94d08",
    storageBucket: "workoutwatcher-94d08.appspot.com",
    messagingSenderId: "970056961109",
    appId: "1:970056961109:web:1bdb4acc8913b8978b98dc"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);