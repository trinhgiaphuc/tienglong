import Link from 'next/link';

const SectionTitle = ({ children, href = '/' }) => {
  return (
    <Link href={href} passHref>
      <div className="my-border flex-center group py-10  cursor-pointer">
        {children}
      </div>
    </Link>
  );
};

export default SectionTitle;
