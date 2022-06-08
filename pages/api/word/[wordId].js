import { getSpecificWordServer } from '@lib/firebase-admin';

export default async function handler(req, res) {
  let { wordId } = req.query;

  try {
    let wordDetails = await getSpecificWordServer(wordId);
    return res.status(200).json({ wordDetails });
  } catch (error) {
    return res.status(500).json({ error });
  }
}
