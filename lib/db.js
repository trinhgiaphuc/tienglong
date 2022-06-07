import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import fetcher from './fetcher';
import { auth, db } from './firebase';

// USERS
export const fetchUserData = async uid => {
  const userRef = doc(db, 'users', uid);
  return await getDoc(userRef);
};

export const checkUserNameExist = () => {
  let name, exist;
  return async username => {
    if (name === username) {
      return exist;
    } else {
      name = username;
      const userRef = doc(db, 'username', username);
      exist = (await getDoc(userRef)).exists();
      return exist;
    }
  };
};

export const createNewUser = async data => {
  const userRef = doc(db, 'users', data.id);
  const usernameRef = doc(db, 'username', data.username);

  const batch = writeBatch(db);
  batch.set(userRef, {
    ...data,
    role: ['user'],
    hearts: 0,
    words: 0,
  });
  batch.set(usernameRef, { id: data.id });

  try {
    await batch.commit();
  } catch (error) {
    console.log(error);
  }
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
  const authorRef = doc(db, 'users', authorId);
  const wordRef = doc(db, 'words', wordId);
  const authorWordRef = doc(db, 'users', authorId, 'user-words', wordId);

  batch.set(heartRef, { heartedAt: Timestamp.now().toMillis() });
  batch.update(authorRef, { hearts: increment(1) });
  batch.update(wordRef, { heartCount: increment(1) });
  batch.update(authorWordRef, { heartCount: increment(1) });

  try {
    await batch.commit();
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
};

// WORDS

export const addNewDefinition = async wordData => {
  const { uid } = auth.currentUser;

  const colRef = collection(db, 'users', uid, 'user-words');
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
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, ...error };
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

  const wordRef = doc(db, 'words', wordId);
  const authorRef = doc(db, 'users', authorId);
  const authorWordRef = doc(db, 'users', authorId, 'user-words', wordId);

  batch.set(wordRef, {
    ...wordDetails,
    status: 'published',
    approvedAt: Timestamp.now().toMillis(),
  });
  batch.update(authorRef, { words: increment(1) });
  batch.update(authorWordRef, {
    status: 'published',
    approvedAt: Timestamp.now().toMillis(),
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

export const rejectPendingWord = async (wordId, authorId) => {
  const userWordRef = doc(db, 'users', authorId, 'user-words', wordId);
  deleteDoc(userWordRef)
    .then(() => ({ success: true }))
    .catch(e => ({ success: false, error: e.errorMessage }));
};

// TODO: CHECK HERE
export const updateDefinition = async (wordId, updateData) => {
  const batch = writeBatch(db);

  const wordRef = doc(db, 'words', wordId);

  batch.update(wordId, updateData);
};

// TODO: CHECK HERE
export const deleteDefinition = async wordId => {
  const batch = writeBatch(db);
  const authorId = auth.currentUser.uid;

  const wordRef = doc(db, 'words', wordId);
  const authorRef = doc(db, 'users', authorId);

  batch.delete(wordRef);
  batch.update(authorRef, { words: increment(-1) });

  try {
    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};
