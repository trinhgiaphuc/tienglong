import { getSpecificUser } from '@lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Bad request' });
  }

  const { uid } = req.query;
  if (uid.length > 1) {
    try {
      const userDetails = await getSpecificUser(uid);

      res.setHeader('Cache-Control', 's-maxage=60,stale-while-revalidate=60');

      return res.status(200).json(userDetails);
    } catch (error) {
      return res.status(500).json({ error: JSON.stringify(error) });
    }
  } else {
    return res.status(400).json({ error: 'Không tìm thấy người dùng' });
  }
}
