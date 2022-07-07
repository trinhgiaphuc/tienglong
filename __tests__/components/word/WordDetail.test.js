// import { render } from '@testing-library/react';
import WordDetail from '@components/word/WordDetail';


const mocks = [];

describe('<WordDetail />', () => {
  test('renders all the word\'s details', () => {
    const { container, debug } = render(<WordDetail />);
    debug();
  });
});
