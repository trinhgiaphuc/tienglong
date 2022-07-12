import * as React from 'react';
import { checkHeartExistence } from '@lib/db';
import { useAuth } from '@lib/userContext';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';

const HeartButton = ({ heartCount, authorId, wordId }) => {
  const { user } = useAuth();

  const [hearts, setHearts] = React.useState(heartCount);
  const [wordIsLiked, setWordIsLiked] = React.useState(false);

  React.useEffect(() => {
    if (user) {
      checkHeartExistence(wordId).then(setWordIsLiked);
    }
  }, [user, wordId]);

  const handleReaction = async () => {
    setHearts(h => (wordIsLiked ? h - 1 : h + 1));
    setWordIsLiked(l => !l);

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/word/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        wordId,
        authorId,
        type: wordIsLiked ? 'unheart' : 'heart',
      }),
    });
  };

  return (
    <button
      disabled={user == null}
      className="active:animate-ping word-button"
      onClick={handleReaction}
    >
      {wordIsLiked ? (
        <IoHeart className="prose-2xl text-red-500" />
      ) : (
        <IoHeartOutline className="prose-2xl" />
      )}
      {user ? <p id="heart-button" className="font-medium">{hearts}</p> : null}
    </button>
  );
};

export default HeartButton;
