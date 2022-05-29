import { getSpecificUser, getUserWords } from '@lib/firebase-admin';

export default async function handler(req, res) {
  console.log(req.query);
  const { uid } = req.query;
  let userDetails;
  let userWords;
  try {
    userDetails = await getSpecificUser(uid);
    userWords = await getUserWords(uid);
    return res.status(200).json({ userDetails, userWords });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
