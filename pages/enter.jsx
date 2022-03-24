import LoginForm from '@components/user/LoginForm';

const EnterPage = ({ referer }) => {
  return <LoginForm referer={referer} />;
};

EnterPage.noNavigation = true;

export const getServerSideProps = ctx => {
  const token = ctx.req.cookies.USER_ACCESS_TOKEN || '';

  if (token.length !== 0) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  const { referer = '/' } = ctx.req.headers;
  return { props: { referer } };
};

export default EnterPage;
