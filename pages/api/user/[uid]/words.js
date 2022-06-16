import { getUserWords } from '@lib/firebase-admin';

export default async function handler(req, res) {
  const { uid } = req.query;
  if (uid.length > 1) {
    try {
      const userWords = (await getUserWords(uid)) || {};

      res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=60'
      );

      return res.status(200).json({ userWords });
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else {
    return res.status(400).json({ error: 'Không tìm thấy người dùng' });
  }
}
