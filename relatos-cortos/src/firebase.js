import firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyALFby83ecUZ8Q_ZuLrR-NKK0eTRI90XdE",
    authDomain: "relato-corto.firebaseapp.com",
    projectId: "relato-corto",
    storageBucket: "relato-corto.appspot.com",
    messagingSenderId: "189583895586",
    appId: "1:189583895586:web:6529a00a6d56075153ae7b",
    measurementId: "G-0G92LMH9MF"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export const db = fb.firestore();


