import { verifyFirebaseToken } from '@lib/firebase-admin';
import { getUserToken } from '@lib/utils';
import jwt from 'jsonwebtoken';

export const withAuth = handler => {
  return async (req, res) => {
    try {
      await verifyFirebaseToken(getUserToken(req));
    } catch (error) {
      if (error.code === 'auth/id-token-expired') {
        ctx.error = error;
      } else {
        return {
          redirect: {
            permanent: false,
            destination: '/enter',
          },
        };
      }
    }
    return handler(req, res);
  };
};

export const verifyToken = token => jwt.verify(token, process.env.JWT_SECRET);
