import { verifyFirebaseToken } from './firebase-admin';
import { getUserToken } from './utils';

export default function withAdminAuth(handler) {
  return async (req, res) => {
    try {
      const { uid } = await verifyFirebaseToken(getUserToken(req));
      req.uid = uid;
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }

    return handler(req, res);
  };
}
