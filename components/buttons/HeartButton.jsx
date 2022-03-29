import { addHeart, checkHeartExistence, removeHeart } from '@lib/db';
import { useState, useEffect } from 'react';
import { useAuth } from '@lib/userContext';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';

const HeartButton = ({ heartCount, authorId, wordId }) => {
  const { user } = useAuth();

  const [hearts, setHearts] = useState(heartCount);
  const [wordIsLiked, setWordIsLiked] = useState(false);

  useEffect(() => {
    if (user) {
      checkHeartExistence(wordId).then(setWordIsLiked);
    }

    return () => {};
  }, [user, wordId]);

  console.log(wordIsLiked);

  return (
    <button
      className="active:animate-ping word-button"
      onClick={async () => {
        wordIsLiked
          ? await removeHeart(wordId, authorId)
          : await addHeart(wordId, authorId);
        setWordIsLiked(!wordIsLiked);
        setHearts(h => (wordIsLiked ? h - 1 : h + 1));
      }}
    >
      {wordIsLiked ? (
        <IoHeart className="prose-2xl text-red-500" />
      ) : (
        <IoHeartOutline className="prose-2xl" />
      )}
      {user ? <p className="font-medium">{hearts}</p> : null}
    </button>
  );
};

export default HeartButton;
