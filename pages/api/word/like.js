import { addHeart, removeHeart, verifyFirebaseToken } from '@lib/firebase-admin';
import { auth } from '@lib/firebase-admin';
import { getUserToken } from '@lib/utils';

export default async function handler(req, res) {
  const token = getUserToken(req);

  if (!token || token.length == 0) {
    return res.status(403).json({ message: 'Please login first' });
  }
  try {
    const { uid } = await verifyFirebaseToken(token);
    const { type, wordId, authorId } = req.body;

    if (type == 'heart') addHeart(wordId, authorId, uid);
    if (type == 'unheart') removeHeart(wordId, authorId, uid);
    return res.status(200).json({ ok: 'ok' });
  } catch (error) {
    console.error(error);
    if (error.errorInfo.code.includes('id-token-expired')) {
      return res.status(403).json({
        message: 'Phiên đăng nhập đã hết hạn, xin vui lòng đăng nhập lại.',
      });
    }
    return res.status(403).json({ message: 'Vui lòng đăng nhập để tiếp tục' });
  }
}
