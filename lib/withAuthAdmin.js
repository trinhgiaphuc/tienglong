import { verifyFirebaseToken } from './firebase-admin';
import { getAdminToken, getUserToken } from './utils';
import { verifyToken } from './withAuth';

export default function withAdminAuth(handler) {
  return async (req, res) => {
    try {
      const { uid, username, picture } = await verifyFirebaseToken(
        getUserToken(req)
      );

      verifyToken(getAdminToken(req));
      req.data = { userId: uid, username, avatar: picture };
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
