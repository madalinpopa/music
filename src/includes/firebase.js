import { initializeApp } from 'firebase/app';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
} from 'firebase/auth';
import {
  getFirestore, doc, setDoc,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';

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
const storage = getStorage();

// Function to add a document
function addDocument(docColl, docId, docData) {
  const newDoc = setDoc(doc(db, docColl, docId), docData);
  return newDoc;
}

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  addDocument,
  storage,
  ref,
  uploadBytesResumable,
};
