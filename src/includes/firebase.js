import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

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
const songsCollection = collection(db, 'songs');

// Function to add a document
function addDocument(docColl, docId, docData) {
  const newDoc = setDoc(doc(db, docColl, docId), docData);
  return newDoc;
}

// Function to add a document with generated id
function setDocument(collName, data) {
  const newDoc = addDoc(collection(db, collName), data);
  return newDoc;
}

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  addDocument,
  setDocument,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  songsCollection,
  query,
  where,
  getDocs,
};
