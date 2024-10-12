import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore,doc ,setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCQyTr59IwVZ2reQmxWJh1Ed1qnHK2wttc",
  authDomain: "expensetracker-78ebb.firebaseapp.com",
  projectId: "expensetracker-78ebb",
  storageBucket: "expensetracker-78ebb.appspot.com",
  messagingSenderId: "762017262253",
  appId: "1:762017262253:web:966ca0c6090b5c1e643424",
  measurementId: "G-JXGY7CRTVM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export{db,auth,provider,doc,setDoc};