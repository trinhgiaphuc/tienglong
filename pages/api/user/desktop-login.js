import bcrypt from 'bcrypt';
import { auth } from '@lib/firebase-admin';

import { userExistWithEmail } from '@lib/firebase-admin';

export default async function handler(req, res) {
  const { email, password } = req.body;
  // const user = await userExistWithEmail(email);

  console.log(req.headers);

  // if (user) {
  //   try {
  //     const correctPass = bcrypt.compareSync(password, user.hashedPassword);

  //     if (correctPass) {
  //       let token = auth.createSessionCookie(user.id,{})
  //       return res.status(200).json({ result });
  //     } else {
  //       throw new Error('Pass not correct');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({ error: 'Shit happened' });
  //   }
  // } else {
  //   return res.status(404).json({ error: 'User not found' });
  // }

  res.status(200).json({ status: 'ta tus con cac' });
}
