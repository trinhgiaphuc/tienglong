import Link from 'next/link';

const SectionTitle = ({ children, href }) => {
  return href ? (
    <Link href={href} passHref>
      <div className="my-border flex-center text-center text-5xl font-bold group py-10 font-ole cursor-pointer">
        {children}
      </div>
    </Link>
  ) : (
    <div className="my-border flex-center text-center text-5xl font-bold font-ole group py-10">
      {children}
    </div>
  );
};

export default SectionTitle;
