import { render, screen } from '@testing-library/react';
import BioForm from '@components/user/BioForm';

test.skip('Bio form renders correctly', () => {
  render(<BioForm image="/asd" username='kimbum' />);

  const username = screen.getByText('kimbum');
  const img = screen.getByAltText('user profile image');
  
  expect(username).toBeInTheDocument();
  expect(img).toBeInTheDocument();
});


test.skip('Bio form will not render image if there is no image', () => {
  render(<BioForm  username='kimbum' />);

  const img = screen.queryByAltText('user profile image');
  
  expect(img).not.toBeInTheDocument();
});
