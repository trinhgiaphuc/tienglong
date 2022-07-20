import { reportWord, verifyFirebaseToken } from '@lib/firebase-admin';
import { getUserToken } from '@lib/utils';

export default async function handler(req, res) {
  const token = getUserToken(req);

  if (!token || token.length == 0) {
    return res.status(403).json({ message: 'Please login first' });
  }

  const { result, error } = await verifyFirebaseToken(token);
  if (error) {
    if (error.errorInfo.code.includes('id-token-expired')) {
      return res.status(403).json({
        message: 'Phiên đăng nhập đã hết hạn, xin vui lòng đăng nhập lại.',
      });
    }
    console.error(error);
    return res.status(403).json({ message: 'Vui lòng đăng nhập để tiếp tục' });
  } else {
    const { uid } = result;
    const { wordId, message } = req.body;

    reportWord(wordId, uid, message);

    return res.status(200).json({ ok: 'ok' });
  }
}
