import RelatedWord from '@components/word/RelatedWords';
import { getPendingWords } from '@lib/firebase-admin';
import Link from 'next/link';
import { validateToken } from 'pages/api/admin';

export async function getServerSideProps({ req, res }) {
  let user;

  try {
    user = validateToken(req.cookies.TIENGLONG_ACCESS_TOKEN);
    const pendingWords = JSON.stringify(await getPendingWords());
    return { props: { pendingWords: JSON.parse(pendingWords) } };
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
        <a className="text-responsive p-4 text-center uppercase">
          &#8592; Phòng Chat
        </a>
      </Link>
      <div className="w-3/4 mx-auto p-2">
        <RelatedWord pendingWords={pendingWords} />
      </div>
    </div>
  );
};

export default ApprovePage;
