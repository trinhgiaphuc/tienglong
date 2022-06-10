import { getSpecificUser, getUserWords } from '@lib/firebase-admin';

export default async function handler(req, res) {
  const { uid } = req.query;
  if (uid.length > 1) {
    try {
      let [userDetails, userWords] = await Promise.all([
        getSpecificUser(uid),
        getUserWords(uid),
      ]);

      res.setHeader(
        'Cache-Control',
        'public, s-maxage=300, stale-while-revalidate=300'
      );

      return res.status(200).json({ userDetails, userWords });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: JSON.stringify(error) });
    }
  } else {
    return res.status(400).json({ error: 'Không tìm thấy người dùng' });
  }
}
