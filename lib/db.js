import WordList from '@components/word/WordList';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { auth, db } from './firebase';

// USERS
export const fetchUserData = async uid => {
  const userRef = doc(db, 'users', uid);
  return await getDoc(userRef);
};

export const getUsernameDoc = async username => {
  const userRef = doc(db, 'username', username);
  return await getDoc(userRef);
};

export const createNewUser = async data => {
  const userRef = doc(db, 'users', data.id);
  const usernameRef = doc(db, 'username', data.username);

  const batch = writeBatch(db);
  batch.set(userRef, data);
  batch.set(usernameRef, { id: data.id });

  try {
    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

//

//

//

// WORDS

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */

export const docToJSON = doc => {
  const docData = doc.data();
  const data = {
    ...docData,
    createdAt: docData.createdAt.toDate(),
    updatedAt: docData.updatedAt.toDate(),
  };

  return JSON.parse(JSON.stringify(data));
};

export const addNewDefinition = async wordData => {
  const { uid } = auth.currentUser;

  const colRef = collection(db, 'users', uid, 'words');
  const userWordRef = doc(colRef);

  try {
    await setDoc(userWordRef, {
      ...wordData,
      id: userWordRef.id,
      authorId: uid,
      status: 'pending',
      createdAt: Timestamp.now().toDate(),
      updatedAt: Timestamp.now().toDate(),
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, ...error };
  }
};

export const updateDefinition = async updateData => {
  const { uid } = auth.currentUser;
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

// Reaction

export const checkHeartExistence = async heartId => {
  const heartRef = doc(db, 'users', auth.currentUser.uid, 'hearts', heartId);

  return (await getDoc(heartRef)).exists();
};

export const addHeart = async (wordId, authorId) => {
  const batch = writeBatch(db);

  const userHeartRef = doc(db, 'users', auth.currentUser.uid, 'hearts', wordId);
  const authorRef = doc(db, 'users', authorId);
  const wordRef = doc(db, 'words', wordId);
  const authorWordRef = doc(db, 'users', authorId, 'words', wordId);

  batch.set(userHeartRef, { uid: auth.currentUser.uid });
  batch.update(authorRef, { heart: increment(1) });
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

  const userHeartRef = doc(db, 'users', auth.currentUser.uid, 'hearts', wordId);
  const authorRef = doc(db, 'users', authorId);
  const wordRef = doc(db, 'words', wordId);
  const authorWordRef = doc(db, 'users', authorId, 'words', wordId);

  batch.delete(userHeartRef);
  batch.update(authorRef, { heart: increment(-1) });
  batch.update(wordRef, { heartCount: increment(-1) });
  batch.update(authorWordRef, { heartCount: increment(-1) });

  try {
    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

// Check Word Is Ok

export const approvePendingWord = async word => {
  const batch = writeBatch(db);
  const userWordRef = doc(db, 'users', word.authorId, 'words', word.id);
  const wordRef = doc(db, 'words', word.id);
  // const likeRef = doc(db, 'likes', word.id);

  try {
    batch.update(userWordRef, { status: 'published' });
    batch.set(wordRef, { ...word, status: 'published' });
    // batch.set(likeRef, { likedBy: [] });

    await batch.commit();
  } catch (error) {
    console.log(error);
  }
};

export const rejectPendingWord = async (wordId, authorId) => {
  const userWordRef = doc(db, 'users', authorId, 'words', wordId);

  try {
    await updateDoc(userWordRef, { status: 'deleted' });
  } catch (error) {
    console.log(error);
  }
};
