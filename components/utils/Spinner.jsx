import Image from 'next/image';

export default function Spinner({ size = 'medium' }) {
  const iconSize = {
    small: 'h-20 w-20',
    medium: 'h-52 w-52',
    large: 'h-80 w-80',
  };

  return (
    <div className="flex-center">
      <div className={`${iconSize[size]} aspect-square`}>
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
