import { verifyFirebaseToken } from './firebase-admin';
import { getAdminToken, getUserToken } from './utils';
import { verifyToken } from './withAuth';

export default function withAdminAuth(handler) {
  return async (req, res) => {
    const { result, error } = await verifyFirebaseToken(
      getUserToken(req)
    );
    if (error) {
      if (
        typeof error.code !== 'undefined' &&
        error.code === 'auth/id-token-expired'
      ) {
        return res.status(401).json({ error: 'auth/id-token-expired' });
      } else {
        return res.status(401).json({ error });
      }
    } else {
      const { uid: userId, username, picture: avatar } = result;
      verifyToken(getAdminToken(req));
      req.data = { userId, username, avatar};
    }
    return handler(req, res);
  }
}
