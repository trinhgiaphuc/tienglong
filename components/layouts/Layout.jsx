import Metatags from '@components/utils/Metatags';
import { Fragment } from 'react';

const Layout = ({ children, title, description, image }) => {
  return (
    <Fragment>
      <Metatags title={title} description={description} image={image} />
      {children}
    </Fragment>
  );
};

export default Layout;
