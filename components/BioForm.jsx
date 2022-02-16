import Image from 'next/image';

const BioForm = ({ image, username }) => {
  return (
    <form className="my-border h-full flex-center flex-col gap-7 order-first lg:order-1">
      <div className="h-1/3 aspect-square">
        <Image src={image} alt="user profile image" width={500} height={500} />
      </div>

      <div className="">
        <h1 className="uppercase font-mono bigger-text-responsive">
          {username || 'user1452'}
        </h1>
      </div>

      <div className="w-3/4 font-mono">
        <p>lời giới thiệu từ bản thân:</p>
        <textarea
          className="p-2 w-full border-2 border-black outline-none"
          cols="30"
          rows="10"
        />
      </div>
    </form>
  );
};

export default BioForm;
