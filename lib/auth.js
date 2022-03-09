import jwt from 'jsonwebtoken';
const { supabase } = require('@lib/supabase');

export default function validateRoute(handler) {
  return async (req, res) => {
    const token = req.cookies['ADMIN_ACCESS_TOKEN'];

    if (token) {
      const data = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

      let user;
      try {
        user = await supabase
          .from('admin')
          .select('*')
          .eq('username', data.username);

        if (user.length === 0) {
          return res.status(400).json({ error: 'User Not Found' });
        }
      } catch (error) {
        console.log(user);
      }

      return handler(req, res, user);
    }

    return res.status(401).json('Chưa được cấp quyền');
  };
}
