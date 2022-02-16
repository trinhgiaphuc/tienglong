import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { auth, db } from './firebase';

export const useUserData = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [status, setStatus] = useState('loading');

  const router = useRouter();

  useEffect(() => {
    let unsubscribe;

    onAuthStateChanged(auth, async userData => {
      if (userData) {
        const userRef = doc(db, 'users', userData.uid);
        setStatus('loading');
        unsubscribe = onSnapshot(userRef, async dcm => {
          if (dcm.data()) {
            setUser(dcm.data());
            setUsername(dcm.data().username);
            setStatus('authenticated');
          } else {
            router.push('/edit-profile');
          }
        });
      } else {
        setStatus('unauthenticated');
      }
    });

    return () => unsubscribe;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, username, status, setStatus, setUser, setUsername };
};

export const useSupabase = () => {};
