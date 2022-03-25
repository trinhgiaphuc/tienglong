// import WordDetailList from '@components/word/WordDetailList';
import WordDetail from '@components/word/WordDetail';
import { firestoreAdmin } from '@lib/firebase-admin';

export async function getServerSideProps(ctx) {
  const { wordId } = ctx.query;

  try {
    const doc = await firestoreAdmin.collection('words').doc(wordId).get();

    return { props: { wordDetails: doc.data() } };
  } catch (error) {
    console.log(error);
  }
}

export default function Word({ wordDetails }) {
  return (
    <div className="my-border lg:p-2  flex flex-col">
      <div className="w-full lg:w-3/4 mx-auto">
        <div className="my-border group flex-center bg-black py-10 text-white">
          <h1 className="title-responsive px-4 text-center py-2 uppercase">
            Chi Tiết Từ
          </h1>
        </div>
        <WordDetail wordDetails={wordDetails} />
        <div className="my-border group flex-center bg-black py-10 text-white">
          <h1 className="title-responsive px-4 text-center py-2 uppercase">
            những từ có thể liên quan
          </h1>
        </div>
        {/* <WordDetailList /> */}
      </div>
    </div>
  );
}
