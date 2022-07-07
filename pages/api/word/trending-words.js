import { getTrendingWords } from '@lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Bad request' });
  }

  const trendingWords = await getTrendingWords();

  res.setHeader(
    "Cache-Control",
    "max-age=120, stale-while-revalidate=120"
  );

  return res.status(200).json({ trendingWords })
}
