import { auth } from '@lib/firebase-admin';
import * as jwt from 'jsonwebtoken';

export const withAuth = handler => {
  return async ctx => {
    const token = ctx.req.cookies.USER_ACCESS_TOKEN || '';

    if (token.length === 0) {
      return {
        redirect: {
          source: ctx.resolvedUrl,
          permanent: true,
          destination: '/enter',
        },
      };
    }

    let decodedIdToken;
    try {
      decodedIdToken = await auth.verifyIdToken(token);
      if (!decodedIdToken || !decodedIdToken.uid) {
        return res.status(401).json({ message: 'Not authenticated.' });
      }
    } catch (error) {
      console.log(`verifyIdToken error: ${error}`);
      return {
        redirect: {
          permanent: true,
          destination: '/enter',
        },
      };
    }

    return handler(ctx);
  };
};

export const validateToken = token => jwt.verify(token, process.env.JWT_SECRET);
