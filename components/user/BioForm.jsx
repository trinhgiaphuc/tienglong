import Image from 'next/image';

const BioForm = ({ image, username }) => {
  return (
    <form className="my-border h-full flex-center flex-col gap-7 lg:order-1">
      {image ? (
        <div className="h-1/4 my-border aspect-square">
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

      <div className="w-3/4 font-mono">
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
