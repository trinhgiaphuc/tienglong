import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

import { isAdmin, getSpecificUser } from '@lib/firebase-admin';
import { createAdminAccount, findAdminWithId } from '@lib/supabase';
import { withAuth } from '@lib/withAuth';

const handler = withAuth(async function (req, res) {
  const { password } = req.body;
  const { uid } = req;

  let user;
  try {
    user = await getSpecificUser(uid);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: 'Something is wrong, please try later.' });
  }
  if (!isAdmin(user)) {
    return res.status(401).json({ error: 'Tài khoản chưa được cấp quyền.' });
  }

  let { username, image } = user;
  let adminAccount;

  try {
    adminAccount = await findAdminWithId(uid);
  } catch (error) {
    return res
      .status(500)
      .json({
        error:
          'Đã xảy ra lỗi khi đang xác thực tài khoản, vui lòng thử lại sau',
      });
  }

  if (adminAccount) {
    if (!passwordIsTheSame(password, adminAccount.hashedPassword)) {
      return res.status(401).json({ error: 'Mật mã sai' });
    }
  } else {
    try {
      let hashedPassword = await hashPassword(password);
      await createAdminAccount(uid, username, hashedPassword, image);
    } catch (error) {
      return res.status(500).json({
        error: 'Đã xảy ra lỗi khi tạo tài khoản, vui lòng thử lại sau',
      });
    }
  }

  let token = jwt.sign({ username, image }, process.env.JWT_SECRET, {
    expiresIn: '3h',
  });

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('ADMIN_ACCESS_TOKEN', token, {
      httpOnly: true,
      maxAge: 3 * 60 * 60,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  return res.status(200).json({ ok: 'ok' });
});

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
