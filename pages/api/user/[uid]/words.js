import { getUserWords } from "@lib/firebase-admin";

export default async function handler(req, res) {
  const { uid } = req.query;
  if (uid.length < 1) {
    return res.status(404).json({ error: "Không tìm thấy người dùng" });
  }
  if (req.body.afterWord) {
    try {
      await verifyFirebaseToken(getUserToken(req));
    } catch (error) {
      return res.status(403).json({ error: "Bạn đang không đăng nhập" });
    }
  } else {
    try {
      const userWords = (await getUserWords(uid)) || [];

      res.setHeader(
        "Cache-Control",
        "max-age=120, stale-while-revalidate=120"
      );

      return res.status(200).json({ userWords });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}
