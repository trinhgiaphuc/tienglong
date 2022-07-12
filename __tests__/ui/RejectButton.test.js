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
 
test.skip('Pending word gets hidden when click reject button (pending)', async () => {
  render(<WordDetail wordDetails={wordDetails} wordIsPending={true} />)
  const wordTitle = await screen.findByText(/Hello Worlds/);
  const rejectBtn = await screen.findByText(/Xóa Bài/i);

  fireEvent.click(rejectBtn);

  expect(await screen.queryByText(/Hello Worlds/i)).not.toBeInTheDocument();
});

