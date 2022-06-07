import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  EmailAuthProvider,
  linkWithCredential,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import fetcher from './fetcher';

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

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();

// AUTHENTICATION
/**
 * `handle sign in with provider`
 * @param  {AuthProvider} provider
 */
export const handleSignIn = async provider => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
  }
};

export const handleSignOut = async () => {
  try {
    await fetcher('enter', { logout: true });
    await signOut(auth);
    Router.reload();
  } catch (error) {
    console.error(error);
  }
};

export async function intergratePassword(email, password) {
  const credential = EmailAuthProvider.credential(email, password);
  try {
    const { user } = linkWithCredential(auth.currentUser, credential);
    console.log('Account linking success', user);
  } catch (error) {
    throw error;
  }
}
