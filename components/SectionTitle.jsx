import Link from 'next/link';

const SectionTitle = ({ title, animation1, animation2, href = '/' }) => (
  <Link href={href} passHref>
    <div className="my-border flex-center group cursor-pointer ">
      {animation1}
      <h2 className="title-responsive font-medium px-4 text-center py-20 uppercase">
        {title}
      </h2>
      {animation2}
    </div>
  </Link>
);

export default SectionTitle;
