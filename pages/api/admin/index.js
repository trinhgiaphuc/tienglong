import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import { firestoreAdmin } from '@lib/firebase-admin';
import { createAdminAccount, findUserWithUserId } from '@lib/supabase';

export default async function handler(req, res) {
  const { uid, password, logOut } = req.body;

  if (typeof logOut !== undefined && logOut) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('ADMIN_ACCESS_TOKEN', '', {
        httpOnly: true,
        expires: new Date('Thu, 01 Jan 1970 00:00:00 GMT'),
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      })
    );

    return res.status(200).json({ ok: 'ok' });
  }

  let firebaseUserData;
  try {
    const res = await firestoreAdmin.collection('users').doc(uid).get();
    firebaseUserData = res.data();

    if (!firebaseUserData) throw new Error('Tài khoản không tồn tại');
    if (!firebaseUserData.role.includes('admin'))
      throw new Error('Chưa được cấp quyền');
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }

  let user = await findUserWithUserId(uid);

  if (!user) {
    try {
      user = await createAdminAccount(
        uid,
        firebaseUserData.username,
        password,
        firebaseUserData.image
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    const passwordIsCorrect = bcrypt.compareSync(password, user.hashedPassword);

    if (!passwordIsCorrect) {
      return res.status(401).json({ error: 'Mật mã sai' });
    }
  }

  const token = jwt.sign(
    { username: user.username, image: firebaseUserData.image },
    process.env.JWT_SECRET,
    {
      expiresIn: '8h',
    }
  );

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('ADMIN_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  return res.status(200).json({ ok: 'ok' });
}

export const validateToken = token => jwt.verify(token, process.env.JWT_SECRET);
