import { docToJSON } from './db';
import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PRIVATE_KEY,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_PROJECT_ID,
    }),
  });
}

export const auth = admin.auth();
export const firestoreAdmin = admin.firestore();

export const getInitialWords = async () => {
  try {
    const words = [];
    const data = await firestoreAdmin
      .collection('words')
      .where('status', '==', 'published')
      .limit(9)
      .get();
    data.forEach(doc => words.push(doc.data()));
    return words;
  } catch (error) {
    throw error;
  }
};

export const getPendingWords = async () => {
  try {
    const words = [];
    const data = await firestoreAdmin
      .collectionGroup('words')
      .where('status', '==', 'pending')
      .limit(10)
      .get();
    data.forEach(doc => {
      words.push(docToJSON(doc));
    });
    return words;
  } catch (error) {
    console.log(error);
  }
};

export const getUserWords = async uid => {
  const wordDocs = await firestoreAdmin
    .collection('words')
    .where('authorId', '==', uid)
    .where('status', '==', 'published')
    .limit(10)
    .get();
  const wordList = [];

  wordDocs.docs.forEach(doc => wordList.push(doc.data()));

  return wordList;
};

// User

export const getSpecificUser = async uid => {
  try {
    const res = await firestoreAdmin.collection('users').doc(uid).get();
    return res.data();
  } catch (error) {
    return error;
  }
};

/**
 * `Check wether user has admin's privilege`
 * @param  {DocumentData} userData
 */
export const checkAdminRole = userData => {
  if (!userData) throw new Error('Tài khoản không tồn tại');
  if (!userData.role.includes('admin'))
    throw new Error('Tài khoản chưa được cấp quyền');
  return true;
};
