import fs from 'fs';
import path from 'path';

import { firestoreAdmin } from './firebase-admin';

let WORDPATH = path.resolve('.words');

const dayInMs = 24 * 60 * 60 * 1000;

function getFileStats(wordpath) {
  return new Promise((resolved, rejected) => {
    fs.stat(wordpath, (err, stat) => {
      if (err) rejected(err);
      if (stat) resolved(stat);
    });
  });
}

function fileIsNew(wordStat) {
  return wordStat.mtimeMs > Date.now() - dayInMs;
}

async function get100Words() {
  // console.log('GETTING 100 WORDS');
  const wordDocs = await firestoreAdmin
    .collection('words')
    .where('approvedAt', '>', Date.now() - dayInMs)
    .limit(100)
    .get();

  return JSON.stringify(wordDocs.docs.map(doc => doc.data()));
}

function saveWords(wordpath, words) {
  fs.writeFileSync(wordpath, words);
}

function getSavedWords(wordpath) {
  return fs.readFileSync(wordpath, { encoding: 'utf8' });
}

async function seeding(wordpath) {
  let newWords;
  try {
    const fileStats = await getFileStats(wordpath);
    if (!fileIsNew(fileStats)) {
      // console.log('WORD IS OUTDATED, FETCHING NEW WORDS...');
      newWords = await get100Words();
      saveWords(wordpath, newWords);
    } else {
      console.log('GETTING SAVED WORDS...');
      newWords = getSavedWords(wordpath);
    }
  } catch (error) {
    // console.log('CANNOT FIND WORDS FILE, CREATING A NEW ONE');
    newWords = await get100Words();
    saveWords(wordpath, newWords);
  }
  return newWords;
}

export default function seed() {
  return seeding(WORDPATH);
}
