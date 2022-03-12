import Image from 'next/image';

const BioForm = ({ image, username }) => {
  return (
    <form className="my-border h-full p-20 flex-center flex-col gap-7 lg:order-1">
      {image ? (
        <div className="w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-2/5  my-border aspect-square">
          <Image
            src={image}
            alt="user profile image"
            width={500}
            height={500}
          />
        </div>
      ) : null}

      <div className="">
        <h1 className="uppercase font-mono text-responsive">{username}</h1>
      </div>

      <div className="sm:w-3/4 w-full font-mono">
        <p>lời giới thiệu từ bản thân:</p>
        <textarea
          className="p-2 w-full border-2 border-black outline-none"
          cols="30"
          rows="5"
        />
      </div>
    </form>
  );
};

export default BioForm;
