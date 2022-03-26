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
import fetcher from './fetcher';
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

  const token = auth.currentUser.uid;

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

/**
 * `Converts a firestore document to JSON`
 * @param  {DocumentSnapshot} doc
 */

export const docToJSON = doc => {
  const data = doc.data();
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
      createdAt: Timestamp.now().toMillis(),
      updatedAt: Timestamp.now().toMillis(),
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

  // For Heart validating
  const userHeartRef = doc(db, 'users', auth.currentUser.uid, 'hearts', wordId);

  // For author heart count
  const authorRef = doc(db, 'users', authorId);

  // For specific word
  const wordRef = doc(db, 'words', wordId);

  // For words when go to author page
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

export const approvePendingWord = async wordDetails => {
  const batch = writeBatch(db);
  const userWordRef = doc(
    db,
    'users',
    wordDetails.authorId,
    'words',
    wordDetails.id
  );
  const wordRef = doc(db, 'words', wordDetails.id);

  batch.update(userWordRef, { status: 'published' });
  batch.set(wordRef, {
    ...wordDetails,
    status: 'published',
  });

  const { word, author, definition: content, id: wordId } = wordDetails;

  try {
    Promise.all([
      batch.commit(),
      fetcher('redis/add-word', { word, author, content, wordId }),
    ]).then(() => {});
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
