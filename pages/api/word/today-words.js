import { getTodayWords, getTrendingWords } from '@lib/firebase-admin';

export default async function handler(req, res) {
  try {
    const todayWords = JSON.stringify(await getTodayWords());
    // const trengdingWords = await getTrendingWords();

    return res.status(200).json({ todayWords: JSON.parse(todayWords) });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ todayWords: [] });
  }
}
