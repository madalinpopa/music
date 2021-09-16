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
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
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

// Function to get document by Id
async function getDocumentById(id) {
  const docRef = doc(db, 'songs', id);
  const docSnap = await getDoc(docRef);
  return docSnap;
}

// Function to update the document by id
async function updateDocumentById(id, payload) {
  const docRef = doc(db, 'songs', id);
  await updateDoc(docRef, payload);
}

// Function to delete a document by id
async function deleteDocumentById(id) {
  const docRef = doc(db, 'songs', id);
  await deleteDoc(docRef);
}

// Function get a document by reference
function getDocumentByReference(id) {
  const docRef = doc(db, 'songs', id);
  const docSnap = getDoc(docRef);
  return docSnap;
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
  deleteObject,
  uploadBytesResumable,
  getDownloadURL,
  songsCollection,
  query,
  where,
  getDocs,
  getDocumentByReference,
  updateDocumentById,
  getDocumentById,
  deleteDocumentById,
};
