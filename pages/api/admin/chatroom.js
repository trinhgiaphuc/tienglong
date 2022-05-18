import { sendMessage } from '@lib/supabase';
import { getAdminToken } from '@lib/utils';
import { validateToken } from '@lib/withAuth';

export default async function handler(req, res) {
  const adminToken = getAdminToken(req);
  if (!adminToken) {
    return res.status(401).json({ error: 'Không Có Admin Token' });
  }

  await validateToken(adminToken).catch(error => {
    return res.status(401).json({ error });
  });

  const { content, userId } = req.body;

  await sendMessage({ content, userId }).catch(error => {
    console.error(error);
    return res.status(500).json({ error });
  });

  return res.status(200).json({ ok: true });
}
