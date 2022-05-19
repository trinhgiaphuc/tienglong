import { getSpecificWordServer } from '@lib/firebase-admin';

export default async function handler(req, res) {
  let { wordId } = req.query;

  let word = await getSpecificWordServer(wordId);

  return res.status(200).json(word);
}
