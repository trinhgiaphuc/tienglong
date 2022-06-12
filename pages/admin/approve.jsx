import WordDetailList from '@components/word/WordDetailList';
import { getPendingWords } from '@lib/firebase-admin';
import { getAdminToken } from '@lib/utils';
import { verifyToken } from '@lib/withAuth';
import Link from 'next/link';

export default function ApprovePage({ pendingWords }) {
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
}

export async function getServerSideProps({ req }) {
  try {
    const adminToken = getAdminToken(req);
    if (!adminToken) throw new Error();
    verifyToken(adminToken);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  try {
    const pendingWords = await getPendingWords();
    return { props: { pendingWords } };
  } catch (error) {
    return { props: { pendingWords: [] } };
  }
}
