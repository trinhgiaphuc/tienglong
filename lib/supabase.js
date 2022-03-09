import { createClient } from '@supabase/supabase-js';

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export const supabase = createClient(supabaseUrl, supabaseKey);

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

export const findUserWithUserId = async userId => {
  const { data, error } = await supabase
    .from('admin')
    .select('*')
    .eq('id', userId)
    .limit(1);

  return data[0];
};

export const createAdminAccount = async (id, username, password, avatar) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await supabase.from('admin').insert([
      {
        id,
        username,
        hashedPassword,
        avatar,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
