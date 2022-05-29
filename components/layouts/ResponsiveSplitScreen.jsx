import { Fragment } from 'react';

const ResponsiveSplitScreen = ({ children }) => {
  const [left, right] = children;

  return (
    <div className="my-border flex flex-col lg:h-body lg:grid grid-cols-2">
      <div className="h-full overflow-y-scroll">{left}</div>
      <div className="h-full overflow-y-scroll">{right}</div>
    </div>
  );
};

export default ResponsiveSplitScreen;
