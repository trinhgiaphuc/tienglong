import { Fragment } from 'react';

import { useAuth } from '@lib/userContext';
import { withAuth } from '@lib/withAuth';

import BioForm from '@components/user/BioForm';
import WordList from '@components/word/WordList';
import Spinner from '@components/Spinner';
import { getUserWords } from '@lib/firebase-admin';

export const getServerSideProps = withAuth(async ({ req, res, query }) => {
  const { uid } = query;
  const wordList = await getUserWords(uid);
  return { props: { wordList } };
});

export default function ProfilePage({ wordList }) {
  const { user, status } = useAuth();

  return (
    <div className="h-[94%] flex flex-col lg:grid grid-cols-2">
      {status === 'loading' ? (
        <Fragment>
          <Spinner size={52} />
          <Spinner size={52} />
        </Fragment>
      ) : (
        <Fragment>
          <div className="h-full overflow-y-scroll">
            <div className="my-border">
              <h1 className="my-border text-4xl font-medium px-4 text-center py-10 uppercase">
                Từ Được Người Dùng Định Nghĩa
              </h1>
            </div>
            <WordList nogrid={true} words={wordList} />
          </div>
          <BioForm {...user} />
        </Fragment>
      )}
    </div>
  );
}
