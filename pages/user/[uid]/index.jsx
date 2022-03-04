import { Fragment } from 'react';

import { useAuth } from '@lib/userContext';

import BioForm from '@components/user/BioForm';
import Error from 'pages/_error';
import WordList from '@components/word/WordList';
import Spinner from '@components/Spinner';
import SectionTitle from '@components/word/SectionTitle';
import { getUserWords } from '@lib/db';

export async function getServerSideProps(ctx) {
  const { uid } = ctx.query;
  const wordList = await getUserWords(uid);

  console.log(wordList);

  return { props: {} };
}

export default function ProfilePage() {
  const { user, status } = useAuth();

  return status !== 'unauthenticated' ? (
    <div className="h-[94%] flex flex-col lg:grid grid-cols-2">
      {status === 'loading' ? (
        <Fragment>
          <Spinner />
          <Spinner />
        </Fragment>
      ) : (
        <Fragment>
          <div className="my-border h-full overflow-y-scroll">
            <SectionTitle title="Từ Được Người Dùng Định Nghĩa" />
            {/* <WordList nogrid={true} /> */}
          </div>
          <BioForm {...user} />
        </Fragment>
      )}
    </div>
  ) : (
    <Error error={{ code: 'permission-denied' }} />
  );
}
