import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  getDoc,
  getDocFromCache,
  getDocFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
  writeBatch,
  increment
} from 'firebase/firestore';

import fetcher from './fetcher';
import { auth, db } from './firebase';

/**
 * `Converts a firestore document to JSON`
 * @param  {DocumentSnapshot} doc
 */
export const docToJSON = doc => {
  const data = doc.data();
  return JSON.parse(JSON.stringify(data));
};

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

// USERS
export const getUserDocument = async (uid, refresh = false) => {
  const userRef = doc(db, 'users', uid);
  let userDocument;
  try {
    if (refresh) {
      userDocument = await getDocFromServer(userRef);
    } else {
      userDocument = await getDocFromCache(userRef);
    }
  } catch (error) {
    console.log('FROM SERVER');
    userDocument = await getDocFromServer(userRef);
  }
  return userDocument;
};

export const createNewUser = async data => {
  const userRef = doc(db, 'users', data.id);
  const usernameRef = doc(db, 'username', data.username);
  const userWordsRef = doc(db, 'user-words', data.id);

  const userData = {
    ...data,
    role: ['user'],
  };

  const batch = writeBatch(db);
  batch.set(userRef, userData);
  batch.set(usernameRef, { id: data.id });
  batch.set(userWordsRef, { words: 0, hearts: 0 });

  await batch.commit().catch(console.error);
  return userData;
};

// USERNAME
export async function checkUserNameExist(username) {
  const userRef = doc(db, 'username', username);
  return (await getDoc(userRef)).exists();
}

// Reaction
export const checkHeartExistence = async wordId => {
  const likerId = auth.currentUser.uid;
  const heartRef = doc(db, 'hearts', `${wordId}-${likerId}`);
  return (await getDoc(heartRef)).exists();
};

export async function getWordsByTagClient(tagName) {
  const q = query(
    collection(db, 'words'),
    orderBy('approvedAt'),
    where('tags', 'array-contains', tagName),
    limit(15)
  );
  const words = await getDocs(q);
  return words.docs.map(docToJSON);
}

// WORDS
export async function addNewDefinition(wordData) {
  if (!validWord(wordData)) return;

  const { uid } = auth.currentUser;

  const colRef = collection(db, 'user-words', uid, 'words');
  const docRef = doc(colRef);

  try {
    await setDoc(docRef, {
      ...wordData,
      id: docRef.id,
      authorId: uid,
      heartCount: 0,
      status: 'pending',
      createdAt: Timestamp.now().toMillis(),
      updatedAt: Timestamp.now().toMillis(),
    });
  } catch (error) {
    console.error(error);
  }
};

export const approvePendingWord = async wordDetails => {
  const batch = writeBatch(db);
  const {
    word,
    author,
    definition: content,
    id: wordId,
    authorId,
  } = wordDetails;

  const wordRef = doc(db, 'user-words', authorId, 'words', wordId);
  const authorRef = doc(db, 'user-words', authorId);

  batch.update(wordRef, {
    status: 'published',
    approvedAt: Timestamp.now().toMillis(),
  });
  batch.update(authorRef, {
    words: increment(1),
  });

  try {
    Promise.all([
      batch.commit(),
      fetcher('redis/add-word', { word, author, content, wordId }),
    ]).then(() => {});
  } catch (error) {
    console.error(error);
  }
};

export async function rejectPendingWord(wordId, authorId) {
  const userWordRef = doc(db, 'user-words', authorId, 'words', wordId);
  await deleteDoc(userWordRef)
    .then(() => ({ success: true }))
    .catch(e => ({ success: false, error: e.errorMessage }));
}

