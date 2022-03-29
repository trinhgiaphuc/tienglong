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

// FIXME: MAKE THIS REALTIME UPDATING
export async function getPendingWords(skip) {
  try {
    const wordsDoc = await firestoreAdmin
      .collection('words')
      .orderBy('createdAt')
      .where('status', '==', 'pending')
      .limit(15)
      .get();

    return wordsDoc.docs.map(docToJSON);
  } catch (error) {
    console.log(error);
    return [];
    // return error;
  }
}

export async function getUserWords(uid) {
  const wordDocs = await firestoreAdmin
    .collection('words')
    .where('authorId', '==', uid)
    .where('status', '==', 'published')
    .limit(10)
    .get();
  const wordList = [];

  wordDocs.docs.forEach(doc => wordList.push(doc.data()));

  return wordList;
}

// TODO:
export async function getSpecificWordServer(wordId) {
  const wordDoc = await firestoreAdmin
    .collection('words')
    .where('id', '==', wordId)
    .get();

  return docToJSON(wordDoc.docs[0]);
}

export async function getTodayWords() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const wordDocs = await firestoreAdmin
    .collection('words')
    .where('approvedAt', '>', today.getTime())
    .limit(15)
    .get();

  return wordDocs.docs.map(doc => doc.data());
}

export async function getTrendingWords() {
  const last3days = Date.now() - 259200000;
  const last3daysObject = new Date(last3days);
  last3daysObject.setHours(0, 0, 0, 0);

  // FIXME:
  const wordDocs = await firestoreAdmin
    .collection('words')
    .orderBy('approvedAt')
    .where('approvedAt', '>', last3daysObject.getTime())
    .orderBy('heartCount')
    .limit(15)
    .get();

  return wordDocs.docs.map(doc => doc.data());
}

export async function getWordsByTagServer(tagName) {
  const wordDocs = await firestoreAdmin
    .collection('words')
    .where('status', '==', 'published')
    .where('tags', 'array-contains', tagName)
    .orderBy('approvedAt')
    .get();

  return wordDocs.docs.map(docToJSON);
}

// User

export async function getSpecificUser(uid) {
  try {
    const res = await firestoreAdmin.collection('users').doc(uid).get();
    return res.data();
  } catch (error) {
    return error;
  }
}

/**
 * `Check wether user has admin's privilege`
 * @param  {DocumentData} userData
 */
export async function checkAdminRole(userData) {
  if (!userData) throw new Error('Tài khoản không tồn tại');
  if (!userData.role.includes('admin'))
    throw new Error('Tài khoản chưa được cấp quyền');
  return true;
}
