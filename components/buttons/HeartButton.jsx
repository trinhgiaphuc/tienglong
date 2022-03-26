import { addHeart, checkHeartExistence, removeHeart } from '@lib/db';
import { useState } from 'react';
import { useAuth } from '@lib/userContext';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';

const HeartButton = ({ heartCount, authorId, wordId }) => {
  const { user } = useAuth();

  const [hearts, setHearts] = useState(heartCount);
  const [wordLiked, setWordLiked] = useState(false);

  if (user) {
    checkHeartExistence(wordId).then(setWordLiked);
  }

  return (
    <button
      className="active:animate-ping word-button"
      onClick={async () => {
        setWordLiked(!wordLiked);
        setHearts(h => (wordLiked ? h - 1 : h + 1));
        wordLiked ? removeHeart(wordId, authorId) : addHeart(wordId, authorId);
      }}
    >
      {wordLiked ? (
        <IoHeart className="prose-2xl text-red-500" />
      ) : (
        <IoHeartOutline className="prose-2xl" />
      )}
      {user ? <p className="font-medium">{hearts}</p> : null}
    </button>
  );
};

export default HeartButton;
