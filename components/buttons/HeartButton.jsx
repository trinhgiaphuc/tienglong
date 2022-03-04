import { addHeart, checkHeartExistence, removeHeart } from '@lib/db';
import { useState } from 'react';
import { useAuth } from '@lib/userContext';
import { IoHeartOutline, IoHeart } from 'react-icons/io5';

const HeartButton = ({ heartCount, authorId, wordId }) => {
  const { user } = useAuth();

  const [hearts, setHearts] = useState(heartCount);
  const [wordLiked, setWordLiked] = useState(false);

  if (!user) return null;

  checkHeartExistence(wordId).then(setWordLiked);

  return (
    <button
      className="word-button text-responsive active:animate-ping"
      onClick={async () => {
        setWordLiked(!wordLiked);
        setHearts(h => (wordLiked ? h - 1 : h + 1));
        wordLiked ? removeHeart(wordId, authorId) : addHeart(wordId, authorId);
      }}
    >
      {wordLiked ? (
        <IoHeart className="bigger-text-responsive text-red-500" />
      ) : (
        <IoHeartOutline className="bigger-text-responsive" />
      )}
      <p className="text-2xl font-medium">{hearts}</p>
    </button>
  );
};

export default HeartButton;
