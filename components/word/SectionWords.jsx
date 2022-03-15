import { Fragment } from 'react';
import SectionTitle from './SectionTitle';
import Title from './Title';
import WordList from './WordList';

import { IoPlayForward } from 'react-icons/io5';

export default function SectionWord({ section, href, words }) {
  return (
    <Fragment>
      <SectionTitle href={href}>
        <IoPlayForward className="title-responsive animate-section opacity-100 group-hover:animate-left-right-out" />
        <Title>{section}</Title>
        <IoPlayForward className="title-responsive animate-section opacity-0 -translate-x-[100%] group-hover:animate-left-right-in" />
      </SectionTitle>

      <WordList words={words} />
    </Fragment>
  );
}
