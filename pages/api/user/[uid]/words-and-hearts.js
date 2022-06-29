import { countUserWordsAndHearts } from '@lib/firebase-admin';
import { withAuth } from '@lib/withAuth';

export default withAuth(async function handler(req, res) {
  const { uid } = req;

  if (uid) {
    try {
      const wordsAndHeartsCount = await countUserWordsAndHearts(uid);

      res.setHeader(
        "Cache-Control",
        "max-age=120, stale-while-revalidate=120"
      );

      return res.status(200).json({ wordsAndHeartsCount });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: JSON.stringify(error) });
    }
  } else {
    return res.status(404).json({ error: 'Không tìm thấy người dùng' });
  }
});
