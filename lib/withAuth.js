import { verifyFirebaseToken } from '@lib/firebase-admin';
import { getUserToken } from '@lib/utils';
import jwt from 'jsonwebtoken';

export const withAuth = handler => {
  return async (req, res) => {
    try {
      const { uid } = await verifyFirebaseToken(getUserToken(req));
      req.uid = uid;
    } catch (error) {
      console.error(error);
      return res.status(403).json({ error: 'Bạn đang không đăng nhập' });
    }
    return handler(req, res);
  };
};

export const verifyToken = token => jwt.verify(token, process.env.JWT_SECRET);
