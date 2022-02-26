import RelatedWord from '@components/word/RelatedWords';
import WordDetail from '@components/word/WordDetail';
import { firestoreAdmin } from '@lib/firebase-admin';

export async function getServerSideProps(context) {
  const { wordId } = context.query;

  try {
    const data = await firestoreAdmin.collection('words').doc(wordId).get();

    const word = JSON.stringify(data.data());

    return { props: { word: JSON.parse(word) } };
  } catch (error) {
    console.log(error);
  }

  return { props: {} };
}

export default function Word({ word }) {
  return (
    <div className="my-border p-2 flex flex-col">
      <div className="w-3/4 mx-auto">
        <div className="my-border group flex-center bg-black py-10 text-white">
          <h1 className="title-responsive px-4 text-center py-2 uppercase">
            Chi Tiết Từ
          </h1>
        </div>
        <WordDetail word={word} />
        <div className="my-border group flex-center bg-black py-10 text-white">
          <h1 className="title-responsive px-4 text-center py-2 uppercase">
            những từ có thể liên quan
          </h1>
        </div>
        {/* <RelatedWord /> */}
      </div>
    </div>
  );
}
