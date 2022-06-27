import fetcher from './fetcher';

export function prefetchWords(handler) {
  let words;
  return async context => {
    if (typeof words === 'undefined' && typeof context.words === 'undefined') {
      words = await fetcher('word/today-words');
    }
    context.words = words;
    return handler(context);
  };
}

export function isString(x) {
  return typeof x === 'string';
}

export function isEmpty(x) {
  if (!isString(x) || Array.isArray(x))
    return new Error('Invalid Input, Must Be a string or an array');
  else return x.length === 0;
}

export function getUserToken(req) {
  const userToken = req.cookies?.USER_ACCESS_TOKEN;
  console.log('vkl', req);
  if (!isString(userToken)) throw new Error('Bạn chưa đăng nhập');
  if (isEmpty(userToken)) throw new Error('Bạn chưa đăng nhập');
  return userToken;
}

export function getAdminToken(req) {
  const adminToken = req.cookies?.ADMIN_ACCESS_TOKEN;
  if (!isString(adminToken)) throw new Error('INVALID ADMIN TOKEN');
  if (isEmpty(adminToken)) throw new Error('ADMIN TOKEN NOT FOUND');
  else return adminToken;
}
