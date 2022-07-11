import { render, screen } from '@testing-library/react';

import Word from '@pages/word/[wordId]';
import getFakeData from '../__mocks__/fakeData';

test('word component display correctly', async () => {

  const { wordDetails } = await getFakeData();

  render(<Word wordDetails={wordDetails} />);

  const heading = screen.getByRole('heading', {
    name: /Hello Worlds/i,
  });

  expect(heading).toBeInTheDocument();
});
