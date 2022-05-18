import { verifyFirebaseToken } from '@lib/firebase-admin';
import { isEmpty } from '@lib/utils';
import cookie from 'cookie';

export default async function handler(req, res) {
  const { authorization } = req.headers;
  const { login, logout } = req.body;

  const token = authorization.split(' ')[1];

  const decodedIdToken = await verifyFirebaseToken(token);

  if (!decodedIdToken || isEmpty(decodedIdToken.uid)) {
    return res.status(401).json({ message: 'Not Real User.' });
  }

  if (login) {
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
