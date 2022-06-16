import { verifyFirebaseToken } from './firebase-admin';
import { getAdminToken, getUserToken } from './utils';
import { verifyToken } from './withAuth';

export default function withAdminAuth(handler) {
  return async (req, res) => {
    try {
      const { uid } = await verifyFirebaseToken(getUserToken(req));
      const data = verifyToken(getAdminToken(req));
      console.log(data);
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
