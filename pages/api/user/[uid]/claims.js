import { auth, getSpecificUser } from "@lib/firebase-admin";
import { getUserToken } from "@lib/utils";

export default async function handler(req, res) {

  if (req.method !== 'POST') {
    return res.status(400).json({ message: 'Bad request' });
  }


  try {
    getUserToken(req);
    return res.status(200).json();
  } catch (error) {
    const { token } = req.body;

    if (!token) {
      return res.status(403).json({ error: "Not allowed" });
    }

    try {
      const { uid } = await auth.verifyIdToken(token);
      const user = await getSpecificUser(uid);

      if (!user) throw new Error("No user");

      await auth.setCustomUserClaims(uid, {
        role: user.role,
        username: user.username,
      });

      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Lỗi nhận diện người dùng" });
    }
  }
}
