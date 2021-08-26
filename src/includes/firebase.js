import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore, collection, addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDt011TGCb4dx-yBz5M85JhtNJLwUduUk8',
  authDomain: 'practice-8417e.firebaseapp.com',
  databaseURL: 'https://practice-8417e.firebaseio.com',
  projectId: 'practice-8417e',
  storageBucket: 'practice-8417e.appspot.com',
  appId: '1:565327000593:web:58f2165ad62f581991adb0',
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const userCollection = collection(db, 'users');

export {
  auth,
  createUserWithEmailAndPassword,
  addDoc,
  userCollection,
};
