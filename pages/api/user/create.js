import * as bcrypt from 'bcrypt';
import { updateUser, userExistWithEmail } from '@lib/firebase-admin';

export default async function handler(req, res) {
  const { data } = req.body;
  const user = await userExistWithEmail(data.email);

  let hashedPass;
  if (user) {
    let salt = await bcrypt.genSalt(10);
    hashedPass = await bcrypt.hash(data.password, salt);
    try {
      const result = await updateUser(data.id, { hashedPass });
      return res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Shit happened' });
    }
  }
}
