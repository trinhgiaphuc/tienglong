export default function AboutPage() {
  return (
    <div className="my-border">
      <div className="my-border">
        <h1 className="my-border text-6xl title text-center py-10 uppercase">
          Tiếng Lòng
        </h1>
      </div>
      <SectionWrapper>
        <ContentWrapper>
          <Title>Về Tiếng Lòng:</Title>
          <Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius
            labore hic earum, placeat quasi error repellendus officia.
            Voluptatibus iusto recusandae blanditiis quidem perferendis
            repudiandae atque commodi cupiditate rerum adipisci? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Aut eius labore hic
            earum, placeat quasi error repellendus officia. Voluptatibus iusto
            recusandae blanditiis quidem perferendis repudiandae atque commodi
            cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aut eius labore hic earum, placeat quasi error
            repellendus officia. Voluptatibus iusto recusandae blanditiis quidem
            perferendis repudiandae atque commodi cupiditate rerum adipisci?
            cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aut eius labore hic earum, placeat quasi error
            repellendus officia. Voluptatibus iusto recusandae blanditiis quidem
            perferendis repudiandae atque commodi cupiditate rerum adipisci?
          </Content>
        </ContentWrapper>

        <hr className="w-1/2 border border-black" />
        <ContentWrapper>
          <Title>Cách Thêm Từ Trong Tiếng Lòng:</Title>
          <Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius
            labore hic earum, placeat quasi error repellendus officia.
            Voluptatibus iusto recusandae blanditiis quidem perferendis
            repudiandae atque commodi cupiditate rerum adipisci? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Aut eius labore hic
            earum, placeat quasi error repellendus officia. Voluptatibus iusto
            recusandae blanditiis quidem perferendis repudiandae atque commodi
            cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aut eius labore hic earum, placeat quasi error
            repellendus officia. Voluptatibus iusto recusandae blanditiis quidem
            perferendis repudiandae atque commodi cupiditate rerum adipisci?
            cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aut eius labore hic earum, placeat quasi error
            repellendus officia. Voluptatibus iusto recusandae blanditiis quidem
            perferendis repudiandae atque commodi cupiditate rerum adipisci?
          </Content>
        </ContentWrapper>

        <hr className="w-1/2 border border-black" />
        <ContentWrapper>
          <Title>Quy Tắc Thêm Từ Trong Tiếng Lòng:</Title>
          <Content>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eius
            labore hic earum, placeat quasi error repellendus officia.
            Voluptatibus iusto recusandae blanditiis quidem perferendis
            repudiandae atque commodi cupiditate rerum adipisci? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Aut eius labore hic
            earum, placeat quasi error repellendus officia. Voluptatibus iusto
            recusandae blanditiis quidem perferendis repudiandae atque commodi
            cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aut eius labore hic earum, placeat quasi error
            repellendus officia. Voluptatibus iusto recusandae blanditiis quidem
            perferendis repudiandae atque commodi cupiditate rerum adipisci?
            cupiditate rerum adipisci? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aut eius labore hic earum, placeat quasi error
            repellendus officia. Voluptatibus iusto recusandae blanditiis quidem
            perferendis repudiandae atque commodi cupiditate rerum adipisci?
          </Content>
        </ContentWrapper>
      </SectionWrapper>
    </div>
  );
}

const SectionWrapper = ({ children }) => (
  <div className="my-border p-4 flex-center flex-col gap-10">{children}</div>
);

const ContentWrapper = ({ children }) => (
  <div className="w-3/4 m-auto flex-center flex-col gap-2">{children}</div>
);

const Title = ({ children }) => (
  <h1 className="text-4xl font-medium text-center py-2 uppercase">
    {children}
  </h1>
);

const Content = ({ children }) => (
  <p className="smaller-text-responsive text-justify">{children}</p>
);
