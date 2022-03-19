import Image from 'next/image';

const informations = [
  {
    title: 'Về Tiếng Lòng:',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius labore hic earum, placeat quasi error repellendus officia. Voluptatibus iusto recusandae blanditiis quidem perferendis repudiandae atque commodi cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius labore hic earum, placeat quasi error repellendus officia. Voluptatibus iusto recusandae blanditiis quidem perferendis repudiandae atque commodi cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius labore hic earum, placeat quasi error repellendus officia. Voluptatibus iusto recusandae blanditiis quidem perferendis repudiandae atque commodi cupiditate rerum adipisci? cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius labore hic earum, placeat quasi error repellendus officia. Voluptatibus iusto recusandae blanditiis quidem perferendis repudiandae atque commodi cupiditate rerum adipisci?',
  },
  {
    title: 'Cách Thêm Từ Trong Tiếng Lòng:',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius labore hic earum, placeat quasi error repellendus officia. Voluptatibus iusto recusandae blanditiis quidem perferendis repudiandae atque commodi cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius labore hic earum, placeat quasi error repellendus officia. Voluptatibus iusto recusandae blanditiis quidem perferendis repudiandae atque commodi cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius labore hic earum, placeat quasi error repellendus officia. Voluptatibus iusto recusandae blanditiis quidem perferendis repudiandae atque commodi cupiditate rerum adipisci? cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius labore hic earum, placeat quasi error repellendus officia. Voluptatibus iusto recusandae blanditiis quidem perferendis repudiandae atque commodi cupiditate rerum adipisci?',
  },
  {
    title: 'Quy Tắc Thêm Từ Trong Tiếng Lòng:',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius labore hic earum, placeat quasi error repellendus officia. Voluptatibus iusto recusandae blanditiis quidem perferendis repudiandae atque commodi cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius labore hic earum, placeat quasi error repellendus officia. Voluptatibus iusto recusandae blanditiis quidem perferendis repudiandae atque commodi cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius labore hic earum, placeat quasi error repellendus officia. Voluptatibus iusto recusandae blanditiis quidem perferendis repudiandae atque commodi cupiditate rerum adipisci? cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius labore hic earum, placeat quasi error repellendus officia. Voluptatibus iusto recusandae blanditiis quidem perferendis repudiandae atque commodi cupiditate rerum adipisci?',
  },
];

export default function AboutPage() {
  return (
    <div className="my-border flex flex-col">
      <div className="my-border">
        <h1 className="my-border text-6xl title text-center py-10 uppercase">
          Tiếng Lòng
        </h1>
      </div>
      <SectionWrapper>
        <div className="aspect-square rounded-full overflow-hidden mt-8 w-80">
          <Image
            src="/about.jpg"
            alt="A guy kissing a girl hand, both standing in the stairs in student uniform"
            width={320}
            height={320}
          />
        </div>
        {informations.map(({ title, content }, i) => (
          <ContentWrapper key={title}>
            <hr className="w-1/2 border border-black mb-8" />
            <Title>{title}</Title>
            <Content>{content}</Content>
          </ContentWrapper>
        ))}
      </SectionWrapper>
    </div>
  );
}

const SectionWrapper = ({ children }) => (
  <section className="my-border flex-grow sm:p-4 flex-center flex-col gap-8">
    {children}
  </section>
);

const ContentWrapper = ({ children }) => (
  <main className="w-3/4 xl:w-1/2 m-auto flex-center py-4 flex-col gap-2">
    {children}
  </main>
);

const Title = ({ children }) => (
  <h1 className="text-4xl font-medium text-center py-2 uppercase">
    {children}
  </h1>
);

const Content = ({ children }) => (
  <p className="smaller-text-responsive sm:text-justify">{children}</p>
);
