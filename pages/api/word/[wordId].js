import { getSpecificWordServer } from '@lib/firebase-admin';

export default async function handler(req, res) {
  let { wordId } = req.query;

  try {
    let word = await getSpecificWordServer(wordId);
    return res.status(200).json(word);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
