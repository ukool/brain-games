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
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'messaging-sender-id',
  appId: 'app-id',
};


let app = null;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

// const app = firebase.initializeApp(firebaseConfig);

export const db = app.database();
