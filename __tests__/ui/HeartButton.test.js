import { render, screen, fireEvent } from '@testing-library/react';
import HeartButton from '@components/buttons/HeartButton';
import WordDetail from '@components/word/WordDetail';

const wordDetails = {
  word: 'Hello Worlds',
  definition: 'I am super handsome',
  example: 'I am testing a the word page',
  heartCount: 300,
  author: 'Mister Man',
  authorId: 'ashdjaskd',
  tags: ['1900', '1234'],
  id: 'asoijdl',
  createdAt: 12000
}

jest.mock('../../lib/userContext', () => {
  return {
    useAuth: () => ({user: {username: 'theboss'}}),
  }
});

jest.mock('../../lib/db', () => {
  return {
    checkHeartExistence: () => Promise.resolve(true),
  }
});

test.skip('heart count change when hit the heart button', async () => {
  render(<WordDetail wordDetails={wordDetails} wordIsPending={false} />)

  const likeCount = await screen.findByText(300);
  fireEvent.click(likeCount);
  expect(await screen.findByText(299)).toBeInTheDocument();
});

