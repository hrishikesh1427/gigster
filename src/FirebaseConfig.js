import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDhe7Q8b6HLRVgrf7rZSLvSoxDXSh3wNr8",
    authDomain: "jobsy-4b012.firebaseapp.com",
    projectId: "jobsy-4b012",
    storageBucket: "jobsy-4b012.appspot.com",
    messagingSenderId: "524268151734",
    appId: "1:524268151734:web:d021b92a852a3136e5d717"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db };