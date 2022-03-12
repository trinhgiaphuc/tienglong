import cookie from 'cookie';

export default async function handler(req, res) {
  const { authorization } = req.headers;
  const { login, logout } = req.body;

  if (login) {
    const token = authorization.split(' ')[1];

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
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('USER_ACCESS_TOKEN', '', {
        httpOnly: true,
        expires: new Date(Date.now() - 1),
        path: '/',
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
      })
    );
  }

  return res.status(200).json({ ok: 'ok' });
}
