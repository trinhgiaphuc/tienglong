import * as React from 'react';

import fetcher from '@lib/fetcher';

import BioForm from '@components/user/BioForm';
import WordList from '@components/word/WordList';
import ResponsiveSplitScreen from '@components/layouts/ResponsiveSplitScreen';
import Title from '@components/word/Title';
import Spinner from '@components/utils/Spinner';
import Link from 'next/link';

export default function ProfilePage({ uid, userWords, error }) {
  const [userDetails, setUserDetails] = React.useState(null);
  React.useEffect(() => {
    fetcher(`user/${uid}`).then(setUserDetails);
  }, [uid]);

  return (
    <ResponsiveSplitScreen>
      {userDetails ? (
        <BioForm {...userDetails} />
      ) : (
        <div className="my-border h-full p-20 flex-center flex-col gap-7 lg:order-1">
          <Spinner />
        </div>
      )}

      {error ? (
        <div className="h-full flex-center">
          <Link href="/enter" passHref>
            <button className="font-ole w-3/4 md:w-1/2 text-lg border-2 border-black p-4 rounded-lg shadow shadow-black">
              {error}
            </button>
          </Link>
        </div>
      ) : (
        <div className="h-full overflow-y-scroll">
          <div className="my-border py-5">
            <Title>Từ Được Người Dùng Định Nghĩa</Title>
          </div>
          <WordList nogrid={true} words={userWords} lastwordNote={true} />
        </div>
      )}
    </ResponsiveSplitScreen>
  );
}

export async function getStaticProps(ctx) {
  let { uid } = ctx.params;

  try {
    // Cookie is not available we're fetching in the server
    const { userWords, error } = await fetcher(`user/${uid}/words`);
    if (error) throw error;

    return {
      props: { userWords, uid },
      revalidate: 150,
    };
  } catch (error) {
    if (error === 'Bạn đang không đăng nhập');
    return {
      props: {
        userDetails: null,
        userWords: [],
        uid,
        error: 'Xin vui lòng đăng nhập để xem thông tin của người dùng',
      },
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { uid: '1' } }],
    fallback: 'blocking',
  };
}
