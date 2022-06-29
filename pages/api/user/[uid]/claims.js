import { auth, getSpecificUser } from "@lib/firebase-admin";
import { getUserToken } from "@lib/utils";

// const ADMIN_EMAIL = [
//   "procute2k@gmail.com",
//   "pussicat113@gmail.com",
//   "trinhgiaphuc2k@gmail.com",
//   "trinhphuc0509@gmail.com",
//   "trinhyaphuc@gmail.com",
//   "thangleo6752@gmail.com"
// ];

export default async function handler(req, res) {
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
