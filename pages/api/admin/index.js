import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import { checkAdminRole, getSpecificUser } from '@lib/firebase-admin';
import { createAdminAccount, findAdminWithId } from '@lib/supabase';

export default async function handler(req, res) {
  const { uid, password } = req.body;

  let firebaseUserData;
  try {
    firebaseUserData = await getSpecificUser(uid);
    checkAdminRole(firebaseUserData);
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }

  let admin;
  try {
    admin = await findAdminWithId(uid);
  } catch (error) {
    return res.status(500).json({ error });
  }

  if (!!admin) {
    const passwordIsCorrect = bcrypt.compareSync(
      password,
      admin.hashedPassword
    );
    if (!passwordIsCorrect)
      return res.status(401).json({ error: 'Mật mã sai' });
  } else {
    try {
      admin = await createAdminAccount(
        uid,
        firebaseUserData.username,
        password,
        firebaseUserData.image
      );
    } catch (error) {
      return res.status(500).json({ error });
    }
  }

  const token = jwt.sign(
    { username: firebaseUserData.username, image: firebaseUserData.image },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('ADMIN_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  return res.status(200).json({ ok: 'ok' });
}
