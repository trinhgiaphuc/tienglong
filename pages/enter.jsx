import LoginForm from '@components/user/LoginForm';
import { handleSignOut } from '@lib/firebase';
import { useAuth } from '@lib/userContext';
import { getUserToken } from '@lib/utils';

const EnterPage = ({ referer }) => {
  const { status } = useAuth();

  // When user sign up but then direct somewhere else in the page when account has not been complete created, sign user out
  if (status === 'need-name') {
    handleSignOut(true);
  }

  return <LoginForm referer={referer} />;
};

EnterPage.noNavigation = true;

export async function getServerSideProps({ req }) {
  try {
    // Check user logged in then redirect
    getUserToken(req);
    return { redirect: { destination: '/', permanent: true } };
  } catch (error) {
    // get the previous route so user can automatically be redirected after logged in, if user is a new account, it's another story...
    const { referer = '/' } = req.headers;
    return { props: { referer } };
  }
}

export default EnterPage;
