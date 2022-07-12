import { render, screen } from '@testing-library/react';

import ProfilePage from 'pages/user/[uid]';

test.skip('ProfilePage renders correctly with mock data', async () => {
  render(<ProfilePage uid={'valid'} userWords={[]} error={null} />);
  const username = await screen.findByText(/chimte/i);
  expect(username).toBeInTheDocument();
});

test.skip('ProfilePage renders not found component with invalid uid', async () => {
  render(<ProfilePage uid={'others'} userWords={[]} error={null} />);
  const username = await screen.findByText('Người dùng không tồn tại');
  expect(username).toBeInTheDocument();
});

