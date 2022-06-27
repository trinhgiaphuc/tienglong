import * as React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { getUserDocument } from './db';

export const useUserData = () => {
  const [user, setUser] = React.useState(null);
  const [status, setStatus] = React.useState('loading');

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async userData => {
      if (userData) {
        const userSnapshot = await getUserDocument(userData.uid);
        if (userSnapshot.exists()) {
          const { claims } = await auth.currentUser.getIdTokenResult();
          // If userAccount exists but claims doesn't have required data, the log user out
          if (!claims.username) {
            auth.signOut();
          } else {
            setUser(userSnapshot.data());
            setStatus('authenticated');
          }
        } else {
          // New account, required data to complete create new account
          setStatus('need-name');
        }
      } else {
        setStatus(() => 'unauthenticated');
        setUser(() => null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { user, status, setStatus, setUser };
};
