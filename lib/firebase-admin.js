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
    return await auth.verifySessionCookie(token);
  } catch (error) {
    throw error;
  }
}

export async function getPendingWords() {
  try {
    const wordsDoc = await firestoreAdmin
      .collectionGroup('words')
      .where('status', '==', 'pending')
      .orderBy('createdAt')
      .limit(15)
      .get();

    return wordsDoc.docs.map(docToJSON);
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function getUserWords(uid) {
  const wordDocs = await firestoreAdmin
    .collection('user-words')
    .doc(uid)
    .collection('words')
    .where('status', '==', 'published')
    .limit(6)
    .get();

  return wordDocs.docs.map(docToJSON);
}

export async function getUserWordsAfter(uid, wordId) {
  const wordSnap = firestoreAdmin
    .collection('user-words')
    .doc(uid)
    .collection('words')
    .where('id', '==', wordId)
    .get();

  const wordDocs = await firestoreAdmin
    .collection('words')
    .where('authorId', '==', uid)
    .where('status', '==', 'published')
    .limit(6)
    .startAfter(wordSnap)
    .get();

  return wordDocs.docs.map(docToJSON);
}

// TODO:
export async function getSpecificWordServer(wordId) {
  const wordDoc = await firestoreAdmin
    .collectionGroup('words')
    .where('id', '==', wordId)
    .get();

  return docToJSON(wordDoc.docs[0]);
}

export async function getTodayWords() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const wordDocs = await firestoreAdmin
    .collectionGroup('words')
    .where('approvedAt', '>', today.getTime())
    .limit(10)
    .get();

  if (wordDocs.empty) return [];
  else return wordDocs.docs.map(docToJSON);
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

function validWord(wordDetails) {
  const { word, definition, example, tags, author } = wordDetails;
  const wordDetailsArray = [word, definition, example, tags, author];
  try {
    wordDetailsArray.forEach(detail => {
      if (typeof detail === 'undefined') throw new Error('Word is not valid');
    });
  } catch (error) {
    return false;
  }
  return true;
}

export async function createWord(word, uid) {
  if (!validWord(word)) throw new Error('Word is not valid');
  const ref = firestoreAdmin
    .collection('users')
    .doc(uid)
    .collection('user-words')
    .doc();
  try {
    await ref.set({
      ...word,
      id: ref.id,
      authorId: uid,
      heartCount: 0,
      status: 'pending',
      createdAt: admin.firestore.Timestamp.now().toMillis(),
      updatedAt: admin.firestore.Timestamp.now().toMillis(),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// User

export async function updateUser(docpath, data) {
  const userRef = firestoreAdmin.collection('users').doc(docpath);
  try {
    const res = await userRef.update(data);
    return res;
  } catch (error) {
    throw error;
  }
}

/**
 * `Get a user details`
 * @param  {string} uid
 */
export async function getSpecificUser(uid) {
  try {
    if (!uid) throw new Error('uid is missing');
    const res = await firestoreAdmin.collection('users').doc(uid).get();
    if (!res.exists) {
      return null;
    } else {
      return docToJSON(res);
    }
  } catch (error) {
    throw error;
  }
}

/**
 * `Check if user with the provided email exists if account exists, return userData, else return null`
 * @param  {string} email
 */
export async function userExistWithEmail(email) {
  const ref = firestoreAdmin.collection('users');

  try {
    const docs = await ref.where('email', '==', email).limit(1).get();
    if (!docs.empty) {
      const userDoc = docs.docs[0];
      return docToJSON(userDoc);
    } else {
      return null;
    }
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
