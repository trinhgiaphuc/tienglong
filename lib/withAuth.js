import { verifyFirebaseToken } from '@lib/firebase-admin';
import { getUserToken } from '@lib/utils';
import jwt from 'jsonwebtoken';

export const withAuth = handler => {
  return async ctx => {
    try {
      await verifyFirebaseToken(getUserToken(ctx.req));
    } catch (error) {
      // TODO: Handle_ERROR_WITH_ERRORBOUN_DARY;
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
    return handler(ctx);
  };
};

export const verifyToken = token => jwt.verify(token, process.env.JWT_SECRET);
