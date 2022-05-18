import { verifyFirebaseToken } from '@lib/firebase-admin';
import { getUserToken } from '@lib/utils';
import jwt from 'jsonwebtoken';

export const withAuth = handler => {
  return async ctx => {
    try {
      const token = getUserToken(ctx.req);
      await verifyFirebaseToken(token);
      return handler(ctx);
    } catch (error) {
      return {
        redirect: {
          destination: '/enter',
          permanent: false,
        },
      };
    }
  };
};

export const verifyToken = token => jwt.verify(token, process.env.JWT_SECRET);
