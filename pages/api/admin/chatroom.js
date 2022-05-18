import { sendMessage } from '@lib/supabase';
import withAdminAuth from '@lib/withAuthAdmin';

const handler = withAdminAuth(async function (req, res) {
  const { content, userId } = req.body;

  await sendMessage({ content, userId }).catch(error => {
    console.error(error);
    return res.status(500).json({ error });
  });

  return res.status(200).json({ ok: true });
});

export default handler;
