import { verifyFirebaseToken } from './firebase-admin';
import { getUserToken } from './utils';

export default function withAdminAuth(handler) {
  return async (req, res) => {
    try {
      const { uid } = await verifyFirebaseToken(getUserToken(req));
      req.uid = uid;
    } catch (error) {
      if (
        typeof error.code !== 'undefined' &&
        error.code === 'auth/id-token-expired'
      ) {
        return res.status(401).json({ error: 'auth/id-token-expired' });
      } else {
        return res.status(401).json({ error });
      }
    }

    return handler(req, res);
  };
}
