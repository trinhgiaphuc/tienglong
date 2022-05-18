// import { getTodayWords, getTrendingWords } from '@lib/firebase-admin';
import seed from '@lib/seeding';

export default async function handler(req, res) {
  try {
    const todayWords = await seed();
    // const todayWords = JSON.stringify(await getTodayWords());
    // const trengdingWords = await getTrendingWords();

    return res.status(200).json({ todayWords: JSON.parse(todayWords) });
    // return res.status(200).json({ ok: 'ok' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}
