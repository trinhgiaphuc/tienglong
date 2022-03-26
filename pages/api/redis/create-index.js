import { createIndex } from '@lib/redis';

export async function handler(req, res) {
  await createIndex();
  res.status(200).send();
}
