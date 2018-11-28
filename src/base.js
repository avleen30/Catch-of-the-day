import firebase from 'firebase';
import Rebase from 're-base';


const firebaseApp = firebase.initializeApp(
  {
    apiKey: "AIzaSyCZ8trxeU0s515KOzFroLdBMNOV2Mc0owg",
    authDomain: "catch-of-the-day-avi.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-avi.firebaseio.com",
    projectId: "catch-of-the-day-avi",
    storageBucket: "catch-of-the-day-avi.appspot.com",
    messagingSenderId: "379368829015"
  }
);

const base = Rebase.createClass(firebaseApp.database());

//Named export
export { firebaseApp };

//this is a default export
export default base;
