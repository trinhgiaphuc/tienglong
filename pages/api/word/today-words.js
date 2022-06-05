import { getTodayWords, getTrendingWords } from '@lib/firebase-admin';

export default async function handler(req, res) {
  try {
    const todayWords = JSON.parse(JSON.stringify(await getTodayWords()));
    // const trengdingWords = await getTrendingWords();

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    );

    return res.status(200).json({ todayWords });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}
