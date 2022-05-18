import { verifyFirebaseToken } from '@lib/firebase-admin';
import { isEmpty } from '@lib/utils';
import jwt from 'jsonwebtoken';

export const withAuth = handler => {
  return async ctx => {
    const token = ctx.req.cookies.USER_ACCESS_TOKEN || '';

    if (isEmpty(token.length)) {
      return {
        redirect: {
          destination: '/enter',
          permanent: false,
        },
      };
    }

    let decodedIdToken = await verifyFirebaseToken(token);

    if (!decodedIdToken || isEmpty(decodedIdToken.uid)) {
      return res.status(401).json({ message: 'Not authenticated.' });
    }

    return handler(ctx);
  };
};

export function validateToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}
