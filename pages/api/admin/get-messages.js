import { getMessages } from "@lib/supabase";
import withAuthAdmin from "@lib/withAuthAdmin";

const handler = withAuthAdmin(async function handler(req, res) {
  try {
    const messages = await getMessages(10);
    return res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ messages: [] });
  }


});

export default handler; 
