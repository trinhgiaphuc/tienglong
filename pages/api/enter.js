import { verifyFirebaseToken } from '@lib/firebase-admin';
import { getUserToken } from '@lib/utils';
import cookie from 'cookie';

export default async function handler(req, res) {
  const { authorization } = req.headers;
  const { login, logout } = req.body;

  if (login) {
    const token = authorization.split(' ')[1];
    try {
      await verifyFirebaseToken(token);
    } catch (error) {
      return res.status(400).json({ ok: 'not ok' });
    }
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('USER_ACCESS_TOKEN', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })
    );
  } else if (logout) {
    try {
      verifyFirebaseToken(getUserToken(req));
    } catch (error) {
      return res.status(400).json({ error });
    }
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

  return res.status(200).json({ ok: 'ok' });
}
