import { render, screen, fireEvent } from '@testing-library/react';
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

jest.mock('../../lib/firebase-admin', () => {
  return {
    approvePendingWord: () => Promise.resolve(),
    rejectPendingWord: (id, authorId) => Promise.resolve(),
  }
});

test.skip('Word Details render correctly', async () => {
  render(<WordDetail wordDetails={wordDetails} wordIsPending={false} />)

  const wordTitle = await screen.findByText(/Hello Worlds/i);

  expect(wordTitle).toBeInTheDocument();

});

test.skip('correct buttons buttons get rendered in correct condition (pending)', async () => {
  render(<WordDetail wordDetails={wordDetails} wordIsPending={true} />)
  const shareBtn = await screen.queryByText(/Chia Sẽ/i);
  const approveBtn = await screen.queryByText(/Duyệt Bài/i);
  expect(shareBtn).not.toBeInTheDocument();
  expect(approveBtn).toBeInTheDocument();
});

test.skip('correct buttons buttons get rendered in correct condition (public)', async () => {
  render(<WordDetail wordDetails={wordDetails} wordIsPending={false} />)
  const shareBtn = await screen.queryByText(/Chia Sẽ/i);
  const approveBtn = await screen.queryByText(/Duyệt Bài/i);
  expect(shareBtn).toBeInTheDocument(false);
  expect(approveBtn).not.toBeInTheDocument();
});

