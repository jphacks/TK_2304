import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDahIObdF9B3-3Q_boEZ5k9hKI-K8y-qaQ",
  authDomain: "camembert-chat.firebaseapp.com",
  projectId: "camembert-chat",
  storageBucket: "camembert-chat.appspot.com",
  messagingSenderId: "376714984254",
  appId: "1:376714984254:web:91e54c3d45be3f23cfca6f"
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
