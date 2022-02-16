import { useRouter } from 'next/router';
import { IoLogoFacebook, IoLogoGoogle } from 'react-icons/io5';

import { auth } from '@lib/firebase';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import fetcher from '@lib/fetcher';

export default function AuthForm() {
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleLogin = async by => {
    try {
      let response;
      if (by === 'facebook')
        response = await signInWithPopup(auth, facebookProvider);

      if (by === 'google')
        response = await signInWithPopup(auth, googleProvider);

      await fetcher('/enter', response.user);
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen flex-center flex-col my-border gap-4">
      <button
        onClick={() => handleLogin('facebook')}
        className="flex-center p-4 gap-2 rounded shadow shadow-black"
      >
        <IoLogoFacebook className="bigger-text-responsive text-blue-500" />
        <p className="bigger-text-responsive">Login With Facebook</p>
      </button>
      <button
        onClick={() => handleLogin('google')}
        className="flex-center p-4 gap-2 rounded bg-red-400 shadow shadow-black"
      >
        <IoLogoGoogle className="bigger-text-responsive text-white" />
        <p className="bigger-text-responsive">Login With Google</p>
      </button>
    </div>
  );
}
