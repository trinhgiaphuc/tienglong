import { render, screen } from '@testing-library/react';

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

test('Word Details render correctly', () => {
  render(<WordDetail wordDetails={wordDetails} wordIsPending={false} />)

  const wordTitle = screen.findByText(/Hello Worlds/i);

  expect(wordTitle).toBeInTheDocument();

});



