import firebase from "firebase";
// import Providers from "next-auth/providers";

const firebaseConfig = {
  apiKey: "AIzaSyBSzoMAmmurwhFZRen7b39I8BZ5ZQSpOaw",
  authDomain: "clone-student.firebaseapp.com",
  projectId: "clone-student",
  storageBucket: "clone-student.appspot.com",
  messagingSenderId: "18485878182",
  appId: "1:18485878182:web:0d84622f75e11038edc367",
};

//config front end config for server side render
const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
export default db;
