import cookie from 'cookie';

export default async function handler(req, res) {
  const { authorization } = req.headers;
  const { login, logout } = req.body;

  console.log(authorization);
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
