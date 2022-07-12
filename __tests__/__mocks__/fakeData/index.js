export default function getFakeData() {
  const wordDetails = {
    word: 'Hello Worlds',
    definition: 'I am super handsome',
    example: 'I am testing a the word page',
    heartCount: 300,
    author: 'Mister Man',
    authorId: 'ashdjaskd',
    tags: ['1900', '1234'],
    id: 'asoijdl',
    createdAt: 12000
  }

  const genWordDetails = (number) => ({
    word: `Hello Worlds ${number}`,
    definition: `I am super handsome ${number}`,
    example: `I am testing a the word page ${number}`,
    heartCount: 300,
    author: `Mister Man ${number}`,
    authorId: `ashdjaskd${number}`,
    tags: ['1900', '1234'],
    id: `asoijdl${number}`,
    createdAt: 12000
  });

  const userDetails = {
    createdAt: '123',
    email:
      "sesamestreet@gmail.com",
    id:
      "BvaoisOtBs2ss232wHhjVljhjhTsi2jc0XN2",
    image:
      "https://lh3.googleusercontent.com/a-/AOh14GgHXWPd8iwX_Dm9swENgg5QufpxDbsHWYJh2jV5=s96-c",
    role: [
      "user",
      "admin"
    ],
    updatedAt: '123',
    username:
      "chimte",
  }

  const wordDetailList = [
    genWordDetails(1),
    genWordDetails(2),
    genWordDetails(3),
    genWordDetails(4),
    genWordDetails(5),
    genWordDetails(6),
    genWordDetails(7),
    genWordDetails(8),
    genWordDetails(9),
    genWordDetails(0),
  ]

  return { wordDetails, userDetails, wordDetailList };
}

