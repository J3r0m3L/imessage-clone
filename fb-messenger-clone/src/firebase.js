import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCN_fqfV7cxWJ8FMqoMev6BWB6texOmn5Y",
  authDomain: "facebook-messenger-clone-74a06.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-74a06.firebaseio.com",
  projectId: "facebook-messenger-clone-74a06",
  storageBucket: "facebook-messenger-clone-74a06.appspot.com",
  messagingSenderId: "962284579906",
  appId: "1:962284579906:web:23f258702dc672db80d1db",
  measurementId: "G-308PK6NC1Z"
});

const db = firebaseApp.firestore();

export default db;
