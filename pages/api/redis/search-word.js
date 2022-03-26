import { searchWordsRedis } from '@lib/redis';

export async function handler(req, res) {
  console.log(req.query);
  // const words = await searchWordsRedis(req);

  res.status(200).json({ ok: 'ok' });
}
