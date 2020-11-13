import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCf3g7V---geggeU81N3KrH12CFie0bbMI",
    authDomain: "th-hour-de18e.firebaseapp.com",
    databaseURL: "https://th-hour-de18e.firebaseio.com",
    projectId: "th-hour-de18e",
    storageBucket: "th-hour-de18e.appspot.com",
    messagingSenderId: "752889992599",
    appId: "1:752889992599:web:f72924c7c9284162fba0d2",
    measurementId: "G-2DEVR41TWQ"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const fieldValue = firebase.firestore.FieldValue;
export default firebase;

