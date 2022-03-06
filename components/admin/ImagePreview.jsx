import Image from 'next/image';

const ImagePreview = ({ src, setContent }) => {
  return (
    <div className="my-border absolute bottom-[105%] flex items-start">
      <div className="h-20 w-20">
        <Image
          width={50}
          height={50}
          id="preview"
          src={src}
          alt="preview Image"
          layout="responsive"
        />
      </div>
      <button
        onClick={() => setContent(c => ({ ...c, image: '' }))}
        className=""
      >
        x
      </button>
    </div>
  );
};

export default ImagePreview;
