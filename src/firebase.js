import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfNDEugg_mANew7PNaEroWC-ZpWGDxnlA",
  authDomain: "clone-462a7.firebaseapp.com",
  projectId: "clone-462a7",
  storageBucket: "clone-462a7.appspot.com",
  messagingSenderId: "606060598835",
  appId: "1:606060598835:web:a1d949e4c4c983716b3546",
  measurementId: "G-GFF8Z9N8G6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

export {db, auth};