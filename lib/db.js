import {
  collection,
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

export async function checkUserNameExist(username) {
  const userRef = doc(db, 'username', username);
  return (await getDoc(userRef)).exists();
}

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

/**
 * `Converts a firestore document to JSON`
 * @param  {DocumentSnapshot} doc
 */
export const docToJSON = doc => {
  const data = doc.data();
  return JSON.parse(JSON.stringify(data));
};

export const getWordsClient = async (count = 9) => {
  const q = query(
    collection(db, 'words'),
    where('status', '==', 'published'),
    limit(count)
  );
  const querySnapshot = await getDocs(q);
  const wordsList = querySnapshot.docs.map(doc => doc.data());

  return wordsList;
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

// Reaction

export const checkHeartExistence = async wordId => {
  const likerId = auth.currentUser.uid;
  const heartRef = doc(db, 'hearts', `${wordId}-${likerId}`);
  return (await getDoc(heartRef)).exists();
};

export const addHeart = async (wordId, authorId) => {
  const batch = writeBatch(db);
  const likerId = auth.currentUser.uid;

  const heartRef = doc(db, 'hearts', `${wordId}-${likerId}`);
  const authorRef = doc(db, 'user-words', authorId);
  const wordRef = doc(db, 'user-words', authorId, 'words', wordId);

  batch.set(heartRef, {});
  batch.update(authorRef, { hearts: increment(1) });
  batch.update(wordRef, { heartCount: increment(1) });

  try {
    await batch.commit();
  } catch (error) {
    console.error(error);
  }
};

export const removeHeart = async (wordId, authorId) => {
  const batch = writeBatch(db);

  const heartRef = doc(db, 'hearts', `${wordId}-${likerId}`);
  const authorRef = doc(db, 'users', authorId);
  const wordRef = doc(db, 'words', wordId);

  batch.update(authorRef, { hearts: increment(-1) });
  batch.update(wordRef, { heartCount: increment(-1) });
  batch.update(authorWordRef, { heartCount: increment(-1) });
  batch.delete(heartRef);

  try {
    await batch.commit();
  } catch (error) {
    console.error(error);
  }
};

// WORDS

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

export const addNewDefinition = async wordData => {
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

// TODO: CHECK HERE
export const updateDefinition = async (wordId, updateData) => {
  const batch = writeBatch(db);

  const wordRef = doc(db, 'words', wordId);

  batch.update(wordId, updateData);
};

// TODO: CHECK HERE
export const deleteDefinition = async wordId => {
  const batch = writeBatch(db);
  // const authorId = auth.currentUser.uid;

  const wordRef = doc(db, 'words', wordId);
  // const authorRef = doc(db, 'users', authorId);

  batch.delete(wordRef);
  // batch.update(authorRef, {
  //   words: increment(-1),
  // });

  try {
    await batch.commit();
  } catch (error) {
    console.error(error);
  }
};
