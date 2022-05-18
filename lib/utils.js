import fetcher from './fetcher';

export function prefetchWords(handler) {
  let words;
  return async context => {
    if (typeof words === 'undefined') {
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
  if (!isString(userToken)) return false;
  if (isEmpty(userToken)) return false;
  return userToken;
}

export function getAdminToken(req) {
  const adminToken = req.cookies?.ADMIN_ACCESS_TOKEN;
  if (!isString(adminToken)) return false;
  if (isEmpty(adminToken)) return false;
  else return adminToken;
}
