export default async function fetcher(url, data = undefined) {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${url}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());
}
