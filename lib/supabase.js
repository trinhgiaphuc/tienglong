import { createClient } from '@supabase/supabase-js';

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getAvatarFromMessage = async id => {
  const { data: user } = await supabase.from('admin').select('*').eq('id', id);

  return user;
};

export const getAllMessages = async limit => {
  const { data: messages } = await supabase
    .from('message')
    .select(
      `id,
      content,
      created_at,
      userId (
        id,
        username,
        avatar)`
    )
    .limit(limit);

  return messages;
};
