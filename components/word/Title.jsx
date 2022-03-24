const Title = ({ color = 'black', children }) => {
  const textColor = `text-${color}`;
  return (
    <h1
      className={`prose sm:prose-2xl md:text-4xl  font-medium px-4 bg-transparent text-center sm:py-2 md:py-5 uppercase ${textColor}`}
    >
      {children}
    </h1>
  );
};

export default Title;
