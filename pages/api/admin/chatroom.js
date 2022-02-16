import validateRoute from '@lib/auth';
import { supabase } from '@lib/supabase';

export default validateRoute(async (req, res, user) => {
  return res.status(200).json({});
});
