import { getTodayWords } from '@lib/firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(400).json({ message: 'Bad request' });
  }

  try {
    const todayWords = JSON.parse(JSON.stringify(await getTodayWords()));
    res.setHeader(
      "Cache-Control",
      "max-age=120, stale-while-revalidate=120"
    );
    return res.status(200).json({ todayWords });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}
