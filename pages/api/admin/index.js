import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import { isAdmin, getSpecificUser } from '@lib/firebase-admin';
import { createAdminAccount, findAdminWithId } from '@lib/supabase';
import withAdminAuth from '@lib/withAuthAdmin';

const handler = withAdminAuth(async function (req, res) {
  const { password } = req.body;
  const { uid } = req;

  let user;
  try {
    user = await getSpecificUser(uid);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
  if (!isAdmin(user)) {
    return res.status(401).json({ error: 'Tài khoản chưa được cấp quyền.' });
  }

  let { username, image } = user;
  let adminAccount;
  try {
    adminAccount = await checkAdminAccountExist(uid);
  } catch (error) {
    return res.status(500).json({ error, type: 'check account error' });
  }
  if (!adminAccount) {
    try {
      let hashedPassword = await hashPassword(password);
      adminAccount = await createAdminAccount(
        uid,
        username,
        hashedPassword,
        image
      );
    } catch {
      return res.status(500).json({ error, type: 'create account error' });
    }
  } else {
    if (!passwordIsTheSame(password, adminAccount.hashedPassword)) {
      return res.status(401).json({ error: 'Mật mã sai' });
    }

    let token = jwt.sign({ username, image }, process.env.JWT_SECRET, {
      expiresIn: '8h',
    });

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

    return res.status(200).json({ ok: true });
  }
});

async function checkAdminAccountExist(uid) {
  try {
    let adminAccount = await findAdminWithId(uid);
    return adminAccount === null || typeof adminAccount === 'undefined'
      ? false
      : adminAccount;
  } catch (error) {
    throw error;
  }
}

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw error;
  }
}

function passwordIsTheSame(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

export default handler;
