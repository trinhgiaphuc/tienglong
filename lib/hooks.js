import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
        if (dcm.exists()) {
          const token = await auth.currentUser.getIdToken();
          await fetch('/api/enter', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'Application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              login: true,
            }),
          });
          setUser(dcm.data());
          setUsername(dcm.data().username);
          setStatus('authenticated');
        } else {
          setStatus('');
          router.push('/edit-profile');
        }
      } else setStatus('unauthenticated');
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, username, status, setStatus, setUser, setUsername };
};
