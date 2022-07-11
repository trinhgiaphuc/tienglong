import { getTrendingWords } from '@lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Bad request' });
  }

  try {
    const trendingWords = JSON.parse(JSON.stringify(await getTrendingWords()));;
    res.setHeader("Cache-Control", "max-age=60");
    return res.status(200).json({ trendingWords })
  } catch (error) {
    console.error(error);
    return res.status(500).json({ trendingWords: [] })
  }
}
