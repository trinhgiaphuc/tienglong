import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  EmailAuthProvider,
  linkWithCredential,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {
  getFirestore,
  enableIndexedDbPersistence,
  clearIndexedDbPersistence,
  terminate,
} from 'firebase/firestore';
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

if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(getFirestore());
}

export const auth = getAuth();
export let db = getFirestore();

export const storage = getStorage();

export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();

// AUTHENTICATION
/**
 * `handle sign in with provider`
 * @param  {AuthProvider} provider
 * @param  {string} referer
 */
export const handleSignIn = async (provider, referer = '/') => {
  if (db._terminated) {
    db = getFirestore();
  }

  try {
    const { user } = await signInWithPopup(auth, provider);
    const { token, claims } = await user.getIdTokenResult();

    if (!claims.username) {
      // Missing required data => HAVE NOT REGISTERED
      Router.push('/edit-profile');
    } else {
      fetcher(`user/${user.uid}/claims`, { token });
      fetcher(`enter`, { token });
      Router.push(referer);
    }
  } catch (error) {
    console.error(error);
  }
};

export const handleSignOut = async (force = false) => {
  try {
    // Force user to logout instead of click in the logout button
    // Happens when account is first created and user need to log in again
    if (!force) {
      await fetcher('enter');
    }

    await signOut(auth);

    // Clear all Cached data
    await terminate(db).then(() => {
      clearIndexedDbPersistence(db).catch(console.error);
    });
    // Router.reload();
  } catch (error) {
    console.error(error);
  }
};

export async function intergratePassword(email, password) {
  const credential = EmailAuthProvider.credential(email, password);
  try {
    await linkWithCredential(auth.currentUser, credential);
    console.log('Account linking success');
  } catch (error) {
    throw error;
  }
}

export async function resetPassword(email) {
  sendPasswordResetEmail(auth, email).catch(error => {
    console.error(error);
  });
}
