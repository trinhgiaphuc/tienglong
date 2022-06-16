import * as React from 'react';

import fetcher from '@lib/fetcher';

import BioForm from '@components/user/BioForm';
import WordList from '@components/word/WordList';
import ResponsiveSplitScreen from '@components/layouts/ResponsiveSplitScreen';
import Title from '@components/word/Title';
import Spinner from '@components/utils/Spinner';

export default function ProfilePage({ uid, userWords }) {
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
      <div className="h-full overflow-y-scroll">
        <div className="my-border">
          <Title>Từ Được Người Dùng Định Nghĩa</Title>
        </div>
        <WordList nogrid={true} words={userWords} />
      </div>
    </ResponsiveSplitScreen>
  );
}

export async function getStaticProps(ctx) {
  let { uid } = ctx.params;

  try {
    const { userWords, error } = await fetcher(`user/${uid}/words`);

    if (error) throw error;

    return {
      props: { userWords, uid },
      revalidate: 150,
    };
  } catch (error) {
    return {
      props: {
        userDetails: null,
        userWords: [],
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
