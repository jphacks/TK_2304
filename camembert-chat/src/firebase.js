import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC5xbJ619RaksYsxp4BM016YLtIu-CXnTg",
  authDomain: "translate-chat-d8dc9.firebaseapp.com",
  projectId: "translate-chat-d8dc9",
  storageBucket: "translate-chat-d8dc9.appspot.com",
  messagingSenderId: "1060925311170",
  appId: "1:1060925311170:web:9e542848b54c7cdca1535b"
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
