import { render, screen } from '@testing-library/react';
import WordList from '@components/word/WordList';
import getFakeData from '__tests__/__mocks__/fakeData';



const { wordDetailList } = getFakeData();


test.skip('word list renders correctly', () => {

  render(<WordList />);

  const text = screen.queryByText('Đã hết từ.');
  expect(text).not.toBeInTheDocument();
});


test.skip('word list renders items correctly', () => {

  render(<WordList words={wordDetailList} lastwordNote={true} />);

  const text = screen.queryByText('Đã hết từ.');
  expect(text).toBeInTheDocument();

});


