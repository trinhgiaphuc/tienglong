import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import fetcher from './fetcher';
import { auth, db } from './firebase';

export const useUserData = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [status, setStatus] = useState('loading');

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async userData => {
      if (userData) {
        setStatus('loading');
        const dcm = await getDoc(doc(db, 'users', userData.uid));
        if (dcm.data()) {
          setUser(dcm.data());
          setUsername(dcm.data().username);
          setStatus('authenticated');
        } else {
          router.push('/edit-profile');
        }
      } else {
        setStatus('unauthenticated');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return { user, username, status, setStatus, setUser, setUsername };
};
