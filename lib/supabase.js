import { createClient } from '@supabase/supabase-js';

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function sendMessage(messageData) {
  await supabase.from('message').insert(messageData, { returning: 'minimal' });
}

export const getAvatarFromMessage = async id => {
  const { data: user } = await supabase
    .from('admin')
    .select('id , username, avatar')
    .eq('id', id);

  return user[0];
};

export const getMessages = async limit => {
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
    .order('created_at', { ascending: false })
    .limit(limit);

  return messages.reverse();
};

export const findAdminWithId = async userId => {
  const { data, error } = await supabase
    .from('admin')
    .select('*')
    .eq('id', userId)
    .limit(1);

  if (error) throw error;
  else return data[0];
};

export async function createAdminAccount(id, username, hashedPassword, avatar) {
  try {
    const { error } = await supabase.from('admin').insert(
      {
        id,
        username,
        hashedPassword,
        avatar,
      },
      { returning: 'minimal' }
    );
    if (error) throw error;
  } catch (error) {
    throw error;
  }
}
