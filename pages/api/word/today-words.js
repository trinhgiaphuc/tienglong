import { getTodayWords, getTrendingWords } from '@lib/firebase-admin';

export default async function handler(req, res) {
  try {
    const todayWords = JSON.parse(JSON.stringify(await getTodayWords()));
    // const trengdingWords = await getTrendingWords();
    return res.status(200).json({ todayWords, trendingWords: [] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}
