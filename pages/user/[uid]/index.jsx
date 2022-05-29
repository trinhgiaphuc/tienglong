import fetcher from '@lib/fetcher';

import BioForm from '@components/user/BioForm';
import WordList from '@components/word/WordList';
import ResponsiveSplitScreen from '@components/layouts/ResponsiveSplitScreen';
import Title from '@components/word/Title';

export default function ProfilePage({ error, userDetails, userWords }) {
  if (error && !userDetails) {
    console.error(error);
    return <h1>Sorry</h1>;
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
    let res = await fetcher(`user/${uid}`);
    if (res.error) throw error;
    return {
      props: {
        userDetails: res.userDetails,
        userWords: res.userWords,
      },
      revalidate: 150,
    };
  } catch (error) {
    return {
      props: {
        error: JSON.parse(JSON.stringify(error)),
        userDetails: null,
        userWords: [],
      },
    };
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { uid: 'dQZUcTXuXDUf9UGHZRkS64V5r0h1' } }],
    fallback: 'blocking',
  };
}
