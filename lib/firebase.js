import { initializeApp } from 'firebase/app';
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import Router from 'next/router';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();

// AUTHENTICATION
export const handleSignIn = async provider => {
  try {
    await signInWithPopup(auth, provider);
    Router.back();
  } catch (error) {
    console.error(error);
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
    Router.reload();
  } catch (error) {
    console.error(error);
  }
};
