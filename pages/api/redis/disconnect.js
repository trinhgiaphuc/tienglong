import { disconnectRedisClient } from '@lib/redis';

export default async function handler(req, res) {
  await disconnectRedisClient();
  res.status(200).json({ ok: 'ok' });
}
