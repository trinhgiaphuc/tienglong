import { addHeart, removeHeart } from '@lib/firebase-admin';
import { auth } from '@lib/firebase-admin';

export default async function handler(req, res) {
  const token = req.cookies['USER_ACCESS_TOKEN'];

  if (!token || token.length == 0) {
    return res.status(403).json({ message: 'Please login first' });
  }
  try {
    const { uid } = await auth.verifyIdToken(token);
    const { type, wordId, authorId } = req.body;

    if (type == 'heart') addHeart(wordId, authorId, uid);
    if (type == 'unheart') removeHeart(wordId, authorId, uid);
  } catch (error) {
    console.log();
    if (error.errorInfo.code.includes('id-token-expired')) {
      return res.status(403).json({
        message: 'Phiên đăng nhập đã hết hạn, xin vui lòng đăng nhập lại.',
      });
    }
    return res.status(403).json({ message: 'Vui lòng đăng nhập để tiếp tục' });
  }
  return res.status(200).json({ ok: 'ok' });
}
