import WordDetailList from '@components/word/WordDetailList';
import { getPendingWords } from '@lib/firebase-admin';
import { validateToken } from '@lib/withAuth';
import Link from 'next/link';

export async function getServerSideProps({ req, res }) {
  let user;

  try {
    user = validateToken(req.cookies.ADMIN_ACCESS_TOKEN);
    // FIXME: CHANGE TO CLIENT SIDE FETCHING
    const pendingWords = await getPendingWords();
    return { props: { pendingWords } };
  } catch (error) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    };
  }
}

const ApprovePage = ({ pendingWords }) => {
  return (
    <div className="my-border h-[94%] overflow-y-scroll no-scrollbar">
      <Link href="/admin/chatroom">
        <a className="text-responsive p-4 text-center uppercase hover:underline">
          &#8592; Phòng Chat
        </a>
      </Link>
      <div className="w-3/4 mx-auto p-2">
        <WordDetailList words={pendingWords} />
      </div>
    </div>
  );
};

export default ApprovePage;
