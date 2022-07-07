import SectionTitle from "@components/word/SectionTitle";
import { render, screen } from "@testing-library/react";

describe('<SectionTitle', () => {
  test('render the section title', () => {
    const { container, debug } = render(<SectionTitle>Fucked Up</SectionTitle>);

    const div = container.querySelector('div');
    debug(div);
    expect(div).toHaveClass('my-border');
    expect(div).toHaveTextContent('Fucked Up');
  });

  test('renders and matches the snapshot', () => {
    const { container, debug } = render(<SectionTitle>Fucked Up</SectionTitle>);

    expect(container).toMatchSnapshot();

  });

});

