import fetcher from '@lib/fetcher';

import BioForm from '@components/user/BioForm';
import WordList from '@components/word/WordList';
import ResponsiveSplitScreen from '@components/layouts/ResponsiveSplitScreen';
import Title from '@components/word/Title';

export default function ProfilePage({ userDetails, userWords }) {
  if (userDetails.isError) {
    console.error(userDetails.error);
  }
  return (
    <ResponsiveSplitScreen>
      <BioForm {...userDetails} />
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
    let { userDetails, userWords } = await fetcher(`user/${uid}`);
    return {
      props: {
        userDetails,
        userWords,
      },
      revalidate: 150,
    };
  } catch (error) {
    return { props: { userDetails: { isError: true, error }, userWords: [] } };
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { uid: 'dQZUcTXuXDUf9UGHZRkS64V5r0h1' } }],
    fallback: 'blocking',
  };
}
