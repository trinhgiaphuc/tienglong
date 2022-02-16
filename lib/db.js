import {
  collection,
  doc,
  getDoc,
  Timestamp,
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

export const addNewDefinition = async wordData => {
  const { uid } = auth.currentUser;

  const wordRef = doc(collection(db, 'words'));
  const userWordRef = doc(collection(db, 'users', uid, 'words'), wordRef.id);

  const batch = writeBatch(db);

  batch.set(wordRef, {
    ...wordData,
    published: true,
    author: doc(db, 'users', uid),
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  batch.set(userWordRef, {
    ...wordData,
    published: true,
    wordRef,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });

  try {
    await batch.commit();
    return { success: true, wordId: wordRef.id };
  } catch (error) {
    return { success: false, ...error };
  }
};

export const updateDefinition = async updateData => {
  const { uid } = auth.currentUser;

  // if (uid === )
};
