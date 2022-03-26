// import WordDetailList from '@components/word/WordDetailList';
import SectionWord from '@components/word/SectionWords';
import Title from '@components/word/Title';
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

export default function Word({ wordDetails = [] }) {
  return (
    <div className="my-border lg:p-2  flex flex-col">
      <div className="w-full lg:w-3/4 mx-auto">
        <div className="my-border group flex-center bg-black py-10 text-white">
          <Title color="white">Chi Tiết Từ</Title>
        </div>
        <WordDetail wordDetails={wordDetails} />
        <div className="my-border group flex-center bg-black py-10 text-white">
          <Title color="white">những từ có thể liên quan</Title>
        </div>
        {/* <WordDetailList /> */}
      </div>
    </div>
  );
}
