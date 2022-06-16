import { verifyFirebaseToken } from '@lib/firebase-admin';
import { getUserToken } from '@lib/utils';

import { auth } from '@lib/firebase-admin';
import cookie from 'cookie';

export default async function handler(req, res) {
  let token;
  let action;

  try {
    token = getUserToken(req);
    action = 'logout';
  } catch (error) {
    token = req.body.token;
    if (!token) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    action = 'login';
  }

  try {
    if (action === 'login') {
      await auth.verifyIdToken(token);
      try {
        const expiresIn = 3 * 24 * 60 * 60 * 1000;
        const session = await auth.createSessionCookie(token, { expiresIn });
        res.setHeader(
          'Set-Cookie',
          cookie.serialize('USER_ACCESS_TOKEN', session, {
            httpOnly: true,
            maxAge: expiresIn,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
          })
        );
      } catch (error) {
        return res.status(500).json({ error });
      }
    } else {
      await verifyFirebaseToken(token);
      res.setHeader('Set-Cookie', [
        cookie.serialize('USER_ACCESS_TOKEN', '', {
          maxAge: -1,
          path: '/',
        }),
        cookie.serialize('ADMIN_ACCESS_TOKEN', '', {
          maxAge: -1,
          path: '/',
        }),
      ]);
    }
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: 'Cookie is wrong or expired' });
  }

  return res.status(200).json({ ok: 'ok' });
}
