import { Fragment } from 'react';

const ResponsiveSplitScreen = ({ children }) => {
  const [left, right] = children;

  return (
    <div className="my-border flex flex-col lg:h-[94%] lg:grid grid-cols-2">
      <Fragment>{left}</Fragment>
      <Fragment>{right}</Fragment>
    </div>
  );
};

export default ResponsiveSplitScreen;
