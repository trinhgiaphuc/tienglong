import Image from 'next/image';

export default function Spinner() {
  return (
    <div className="h-full w-full my-border grid-item-center">
      <div className="h-52 w-52">
        <Image
          priority
          width={100}
          height={100}
          layout="responsive"
          src="/spinner.svg"
          alt="loading icon"
        />
      </div>
    </div>
  );
}
