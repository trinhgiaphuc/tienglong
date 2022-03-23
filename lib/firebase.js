import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
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
    const { user } = await signInWithPopup(auth, provider);
    const { accessToken: token } = user;

    await fetch('/api/enter', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'Application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        login: true,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const handleSignOut = async () => {
  try {
    await signOut(auth);
    await fetcher('enter', { logout: true });
    Router.reload();
  } catch (error) {
    console.error(error);
  }
};
