const Title = ({ color = 'black', children }) => {
  const textColor = `text-${color}`;
  return (
    <h1
      className={`title-responsive font-medium px-4 bg-transparent text-center py-10 uppercase ${textColor}`}
    >
      {children}
    </h1>
  );
};

export default Title;
