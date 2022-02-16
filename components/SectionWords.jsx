import { IoPlayForward } from 'react-icons/io5';
import SectionTitle from './SectionTitle';
import WordList from './WordList';

export default function SectionWord({ section, href }) {
  return (
    <div>
      <SectionTitle
        href={href}
        title={section}
        animation1={
          <IoPlayForward className="title-responsive animate-section opacity-100 group-hover:animate-left-right-out" />
        }
        animation2={
          <IoPlayForward className="title-responsive animate-section opacity-0 -translate-x-[100%] group-hover:animate-left-right-in" />
        }
      />

      <WordList />
    </div>
  );
}
