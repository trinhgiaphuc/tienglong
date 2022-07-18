import { searchWordsRedis } from '@lib/redis';

export default async function handler(req, res) {
  const { q } = req.query;
  try {
    const words = await searchWordsRedis(q);
    return res.status(200).json(words);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something does not seem right here...' });
  }

}
