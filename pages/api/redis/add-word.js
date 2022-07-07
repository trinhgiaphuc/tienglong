import { createWordRedis } from '@lib/redis';

export default async function handler(req, res) {
  const word = req.body;

  try {
    await createWordRedis(word);
    res.status(200).json({ ok: 'ok' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
}
