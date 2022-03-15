import { Fragment } from 'react';

import { useAuth } from '@lib/userContext';
import { withAuth } from '@lib/withAuth';
import { getUserWords } from '@lib/firebase-admin';

import BioForm from '@components/user/BioForm';
import WordList from '@components/word/WordList';
import Spinner from '@components/utils/Spinner';
import ResponsiveSplitScreen from '@components/layouts/ResponsiveSplitScreen';
import Title from '@components/word/Title';

export const getServerSideProps = withAuth(async ({ req, res, query }) => {
  const { uid } = query;
  const wordList = await getUserWords(uid);
  return { props: { wordList } };
});

export default function ProfilePage({ wordList }) {
  const { user, status } = useAuth();

  return status === 'loading' ? (
    <ResponsiveSplitScreen>
      <Spinner />
      <Spinner />
    </ResponsiveSplitScreen>
  ) : (
    <ResponsiveSplitScreen>
      <BioForm {...user} />
      <div className="h-full overflow-y-scroll">
        <div className="my-border">
          <Title>Từ Được Người Dùng Định Nghĩa</Title>
        </div>
        <WordList nogrid={true} words={wordList} />
      </div>
    </ResponsiveSplitScreen>
  );
}
