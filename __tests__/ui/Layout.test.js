import {render, screen } from '@testing-library/react';
import LayoutComponent from '@components/layouts/Layout';

test.skip('Layout component renders correctly',() => {
  render(<LayoutComponent><h1>the child</h1></LayoutComponent>);
  const child = screen.getByText('the child');
  expect(child).toBeInTheDocument();

});


