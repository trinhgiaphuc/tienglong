import { IoLogoFacebook, IoLogoGoogle } from 'react-icons/io5';

const EnterPage = () => {
  return (
    <div className="w-full h-screen flex-center flex-col my-border gap-4">
      <button className="flex-center p-4 gap-2 rounded shadow shadow-black">
        <IoLogoFacebook className="bigger-text-responsive text-blue-500" />
        <p className="bigger-text-responsive">Login With Facebook</p>
      </button>
      <button className="flex-center p-4 gap-2 rounded bg-red-400 shadow shadow-black">
        <IoLogoGoogle className="bigger-text-responsive text-white" />
        <p className="bigger-text-responsive">Login With Google</p>
      </button>
    </div>
  );
};
EnterPage.enter = true;

export default EnterPage;
