import { verifyFirebaseToken } from '@lib/firebase-admin';
import { getUserToken } from '@lib/utils';
import jwt from 'jsonwebtoken';

export const withAuth = handler => {
  return async (req, res) => {
    const { result, error } = await verifyFirebaseToken(getUserToken(req));
    if (error) {
      return res.status(403).json({ error: 'Bạn đang không đăng nhập' });
    } else {
      req.uid = result.uid;
    }
    return handler(req, res);
  };
};

export const verifyToken = token => jwt.verify(token, process.env.JWT_SECRET);
