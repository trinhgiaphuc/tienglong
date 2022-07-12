import { rest } from 'msw';
import getFakeData from '../fakeData';

export const handlers = [
  rest.get("http://localhost:3000/api/user/:uid", async (req, res, ctx) => {
    if (req.params.uid !== 'valid') {
      return res(ctx.json('not-found'));
    } else {
      const {userDetails} = await getFakeData();
      return res(ctx.json(userDetails));
    }
  }),
  rest.post('http://localhost:3000/api/redis/add-word', async (req, res, ctx) => {
    return res(ctx.json({ok: 'ok'}));
  }),
  rest.post('http://localhost:3000/api/word/like', async (req, res, ctx) => {
    return res(ctx.json({ok: 'ok'}));
  }),
];


