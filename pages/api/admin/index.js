import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import { firestoreAdmin } from '@lib/firebase-admin';
import { supabase } from '@lib/supabase';

export default async function handler(req, res) {
  const { uid, password, logOut } = req.body;

  if (typeof logOut !== undefined && logOut) {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('TIENGLONG_ACCESS_TOKEN', '', {
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

  const { data, error } = await supabase
    .from('admin')
    .select('*')
    .eq('id', uid)
    .limit(1);

  let user = data[0];

  if (!user) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = await supabase.from('admin').insert([
        {
          id: uid,
          username: firebaseUserData.username,
          hashedPassword,
          avatar: firebaseUserData.image,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  const passwordIsCorrect = bcrypt.compareSync(
    password,
    data[0].hashedPassword
  );

  if (!passwordIsCorrect) {
    return res.status(401).json({ error: 'Mật mã sai' });
  }

  const token = jwt.sign(
    { username: user.username, image: firebaseUserData.image },
    process.env.NEXT_PUBLIC_JWT_SECRET,
    {
      expiresIn: '8h',
    }
  );

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('TIENGLONG_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  return res.status(200).json({ ok: 'ok' });
}

export const validateToken = token =>
  jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
