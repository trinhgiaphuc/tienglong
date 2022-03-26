import Link from 'next/link';

const DefinePageLink = ({ href, children }) => {
  return (
    <Link href={href} passHref>
      <a className="my-border no-underline rounded-full font-medium text-black active:scale-75 duration-700 p-3">
        {children}
      </a>
    </Link>
  );
};

export default DefinePageLink;
