import LoginForm from '@components/user/LoginForm';
import { getUserToken } from '@lib/utils';

const EnterPage = ({ referer }) => {
  return <LoginForm referer={referer} />;
};

EnterPage.noNavigation = true;

export async function getServerSideProps({ req, res }) {
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  try {
    getUserToken(req);
    return { redirect: { destination: '/', permanent: true } };
  } catch (error) {
    const { referer = '/' } = req.headers;
    return { props: { referer } };
  }
}

export default EnterPage;
