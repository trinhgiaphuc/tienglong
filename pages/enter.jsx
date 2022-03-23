import LoginForm from '@components/user/LoginForm';

const EnterPage = ({ referer }) => {
  return <LoginForm referer={referer} />;
};

EnterPage.noNavigation = true;

export const getServerSideProps = ctx => {
  const { referer = '/' } = ctx.req.headers;
  return { props: { referer } };
};

export default EnterPage;
