import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCrP0JwDmvY9YjqnUdPnciamN0LjQcVOgI",
  authDomain: "transchat-b4c7e.firebaseapp.com",
  projectId: "transchat-b4c7e",
  storageBucket: "transchat-b4c7e.appspot.com",
  messagingSenderId: "658105783403",
  appId: "1:658105783403:web:7c9e3efb6e51afff850d2e"
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
