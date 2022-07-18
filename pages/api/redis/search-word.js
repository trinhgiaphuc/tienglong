import { searchWordsRedis } from '@lib/redis';

export default async function handler(req, res) {
  const { q } = req.query;
  const words = await searchWordsRedis(q);
  res.status(200).json(words);
}
