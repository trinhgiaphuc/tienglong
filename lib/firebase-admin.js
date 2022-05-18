import { docToJSON } from './db';
import * as admin from 'firebase-admin';
import { firestore } from 'firebase-admin';

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

export async function verifyFirebaseToken(token) {
  try {
    return await auth.verifyIdToken(token);
  } catch (error) {
    throw error;
  }
}

export async function getPendingWords(skip = 0) {
  try {
    const wordsDoc = await firestoreAdmin
      .collectionGroup('user-words')
      .where('status', '==', 'pending')
      .orderBy('createdAt')
      .limit(15)
      .startAfter(skip)
      .get();

    return wordsDoc.docs.map(docToJSON);
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getUserWords(uid) {
  const wordDocs = await firestoreAdmin
    .collection('words')
    .where('authorId', '==', uid)
    .where('status', '==', 'published')
    .limit(10)
    .get();

  return wordDocs.docs.map(docToJSON);
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

  return wordDocs.docs.map(docToJSON);
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

  return wordDocs.docs.map(docToJSON);
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
/**
 * `Get a user details`
 * @param  {string} uid
 */
export async function getSpecificUser(uid) {
  try {
    const res = await firestoreAdmin.collection('users').doc(uid).get();
    return res.data();
  } catch (error) {
    throw error;
  }
}

/**
 * `Check wether user has admin's privilege`
 * @param  {DocumentData} userData
 */
export function isAdmin(userData) {
  return userData?.role?.includes('admin');
}

// REACTION

function getReactionRefs(wordId, authorId, likerId) {
  const heartRef = firestoreAdmin.doc(`hearts/${wordId}-${likerId}`);
  const authorRef = firestoreAdmin.doc(`users/${authorId}`);
  const wordRef = firestoreAdmin.doc(`words/${wordId}`);
  const authorWordRef = firestoreAdmin.doc(
    `users/${authorId}/user-words/${wordId}`
  );
  return { heartRef, authorRef, wordRef, authorWordRef };
}

export async function addHeart(wordId, authorId, likerId) {
  const batch = firestoreAdmin.batch();
  const refs = getReactionRefs(wordId, authorId, likerId);

  batch.set(refs.heartRef, { heartedAt: firestore.Timestamp.now().toMillis() });
  batch.update(refs.authorRef, { hearts: firestore.FieldValue.increment(1) });
  batch.update(refs.wordRef, { heartCount: firestore.FieldValue.increment(1) });
  batch.update(refs.authorWordRef, {
    heartCount: firestore.FieldValue.increment(1),
  });

  await batch.commit().catch(console.error);
}

export async function removeHeart(wordId, authorId, likerId) {
  const batch = firestoreAdmin.batch();
  const refs = getReactionRefs(wordId, authorId, likerId);

  batch.delete(refs.heartRef);
  batch.update(refs.authorRef, { hearts: firestore.FieldValue.increment(-1) });
  batch.update(refs.wordRef, {
    heartCount: firestore.FieldValue.increment(-1),
  });
  batch.update(refs.authorWordRef, {
    heartCount: firestore.FieldValue.increment(-1),
  });

  await batch.commit().catch(console.error);
}
