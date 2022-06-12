import { createWord } from '@lib/firebase-admin';
import { withAuth } from '@lib/withAuth';

async function handler(req, res) {
  const word = req.body;
  const { uid } = req;

  try {
    await createWord(word, uid);
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error });
  }
}

export default withAuth(handler);
