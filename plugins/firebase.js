// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/messaging';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: 'AIzaSyA26su24z7mp2OzM40XgelWfU2aDfG0dkU',
  authDomain: 'simulators-70d7e.firebaseapp.com',
  databaseURL: 'https://simulators-70d7e.firebaseio.com',
  projectId: 'simulators-70d7e',
  storageBucket: 'simulators-70d7e.appspot.com',
  messagingSenderId: '556028555053',
  appId: '1:556028555053:web:921560d1f44f6447b76da4',
};


let app = null;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

// const app = firebase.initializeApp(firebaseConfig);
let db;
if (app) {
  db = app.database().ref();
}

export default db;
