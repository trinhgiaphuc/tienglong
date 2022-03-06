import Image from 'next/image';

export default function Spinner({ size }) {
  const iconSize = `h-${size} w-${size}`;

  return (
    <div className="h-full w-full grid-item-center">
      <div className={`${iconSize} aspect-square`}>
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
