import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAXFkhu39OjgrUIlMPo37d9ybQ_hwsdLjo',
  authDomain: 'media-voices-dev.firebaseapp.com',
  projectId: 'media-voices-dev',
  storageBucket: 'media-voices-dev.appspot.com',
  messagingSenderId: '503667474325',
  appId: '1:503667474325:web:0b97409f50ae006a86c09c',
};

// Init firebase
firebase.initializeApp(firebaseConfig);

// Init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// firestore helper functions
const addToArray = data => firebase.firestore.FieldValue.arrayUnion(data);
const removeFromArray = data => firebase.firestore.FieldValue.arrayRemove(data);

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {
  projectFirestore,
  projectAuth,
  projectStorage,
  timestamp,
  addToArray,
  removeFromArray,
};
