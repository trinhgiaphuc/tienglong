import { getUserWordsAfter } from '@lib/firebase-admin';
import { withAuth } from '@lib/withAuth';

export default withAuth(async function handler(req, res) {
  const { uid } = req.query;
  const { wordId } = req.body;

  if (uid.length > 1) {
    try {
      const userWords = await getUserWordsAfter(uid, wordId);

      res.setHeader(
        'Cache-Control',
        'public, s-maxage=60, stale-while-revalidate=60'
      );

      return res.status(200).json({ userWords });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: JSON.stringify(error) });
    }
  } else {
    return res.status(400).json({ error: 'Không tìm thấy người dùng' });
  }
});
