import { Client, Entity, Schema } from 'redis-om';

const client = new Client();

client.open(process.env.REDIS_URL).then(() => console.log('REDIS CONNECTED'));

async function connect() {
  if (!client.isOpen()) await client.open(process.env.REDIS_URL);
}

class Word extends Entity {}

let wordSchema = new Schema(
  Word,
  {
    word: { type: 'string' },
    author: { type: 'string' },
    content: { type: 'string', textSearch: true },
    wordId: { type: 'string' },
  },
  {
    dataStructure: 'JSON',
  }
);

const wordRepository = client.fetchRepository(wordSchema);

export async function createWordRedis(data) {
  await connect();
  try {
    await wordRepository.createAndSave(data);
  } catch (error) {
    return error;
  }
}

export async function createIndex() {
  await connect();
  await wordRepository.createIndex();
}

export async function searchWordsRedis(q) {
  await connect();
  const words = await wordRepository
    .search()
    .where('word')
    .eq(q)
    .or('author')
    .eq(q)
    .or('content')
    .matches(q)
    .returnAll();

  return words;
}
