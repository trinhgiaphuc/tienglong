import { addNewDefinition } from '@lib/db';
import { useAuth } from '@lib/userContext';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AddWordForm = () => {
  const router = useRouter();

  const { username } = useAuth();

  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [example, setExample] = useState('');
  const [tags, setTags] = useState({});
  const [yearRelease, setYearRelease] = useState(new Date().getFullYear());
  const [othersTags, setOthersTags] = useState('');

  const handleSelect = e => {
    if (e.target.name === 'muc_do_thinh_hanh') {
      setTags({ ...tags, trend: e.target.id });
    }
    if (e.target.name === 'nguon_goc') {
      setTags({ ...tags, source: e.target.id });
    }
  };

  const tagCombiner = (tags, othersTags) => {
    let finalTags = [];
    if (Object.keys(tags).length > 0) {
      finalTags = [...finalTags, ...Object.values(tags)];
    }
    if (othersTags.split(',')[0] !== '') {
      finalTags = [...finalTags, ...othersTags.split(',')];
    }
    finalTags.push(yearRelease);
    return finalTags;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const combinedTags = tagCombiner(tags, othersTags);

    const res = await addNewDefinition({
      word,
      definition,
      example,
      tags: combinedTags,
      author: username,
    });

    if (res.success) {
      router.push('/');
    } else if (!res.success) {
      console.log(res);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-border p-5 sm:p-10 flex-grow bg-white w-full flex-center flex-col md:grid grid-cols-10 gap-10"
    >
      <input
        className="my-1 sm:my-0 input w-full md:h-full text-responsive p-4 col-span-4"
        placeholder="Từ ngữ"
        minLength={2}
        onChange={e => setWord(e.target.value)}
        value={word}
        type="text"
        spellCheck={false}
      />

      <textarea
        rows={15}
        className="my-1 sm:my-0 input w-full md:h-full text-responsive resize-none col-span-6 row-span-3"
        placeholder="Định nghĩa"
        minLength={15}
        onChange={e => setDefinition(e.target.value)}
        value={definition}
        type="text"
        spellCheck={false}
      />
      <textarea
        rows={8}
        minLength={15}
        className="my-1 sm:my-0 input w-full md:h-full text-responsive resize-none col-span-4"
        placeholder="Ví Dụ"
        onChange={e => setExample(e.target.value)}
        value={example}
        type="text"
        spellCheck={false}
      />

      <div className="my-1 sm:my-0 input w-full md:h-full relative text-responsive flex col-span-4 group">
        <input
          className="input border-none w-full p-5 show_select"
          placeholder="Ví Dụ: tag1,tag2,tag3"
          onChange={e =>
            setOthersTags(
              e.target.value
                .trim()
                .toLocaleLowerCase()
                .replace(/[^a-zA-Z0-9,]+/, '')
                .replace(',,', ',')
            )
          }
          value={othersTags}
        />
        <div className="selector group-hover:scale-100 group-hover:-translate-y-full">
          <SelectTrendTag handleSelect={handleSelect} />
          <SelectSourceTag handleSelect={handleSelect} />
        </div>

        <SelectYearTag setYearRelease={setYearRelease} />
      </div>

      <div className="my-1 sm:my-0 bg-blue-400 col-span-10 w-full">
        <button className="my-border ml-auto w-full bg-black text-white p-4 font-medium uppercase">
          Định Nghĩa
        </button>
      </div>
    </form>
  );
};

const SelectYearTag = ({ setYearRelease }) => {
  const years = [];
  for (let i = 1800; i <= 2100; i++) {
    years.push(i);
  }
  return (
    <div>
      <select
        className="outline-none show_select font-medium p-2 sm:p-4 tracking-wide text-responsive"
        name="years"
        id="select_year"
        defaultValue={new Date().getFullYear()}
        onChange={e => setYearRelease(e.target.value)}
      >
        {years.map(year => (
          <option
            className="text-responsive tracking-wide"
            key={year}
            value={year}
          >
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

const SelectTrendTag = ({ handleSelect }) => (
  <div className="my-border flex flex-col bg-red-400">
    <div className="wordList__tag">
      <input
        onChange={handleSelect}
        type="radio"
        name="muc_do_thinh_hanh"
        id="#khongloithoi"
      />
      <label htmlFor="#khongloithoi">Không Lỗi Thời</label>
    </div>

    <div className="wordList__tag">
      <input
        onChange={handleSelect}
        type="radio"
        name="muc_do_thinh_hanh"
        id="#dangthinhhanh"
      />
      <label htmlFor="#dangthinhhanh">Đang Thịnh Hành</label>
    </div>

    <div className="wordList__tag">
      <input
        onChange={handleSelect}
        type="radio"
        name="muc_do_thinh_hanh"
        id="#khongconphobien"
      />
      <label htmlFor="#khongconphobien">Không Còn Phổ Biến</label>
    </div>
  </div>
);

const SelectSourceTag = ({ handleSelect }) => (
  <div className="my-border flex flex-col bg-green-400">
    <div className="wordList__tag">
      <input
        onChange={handleSelect}
        type="radio"
        name="nguon_goc"
        id="#mienbac"
      />
      <label htmlFor="#mienbac">Nguồn Gốc Từ Phía Bắc</label>
    </div>
    <div className="wordList__tag">
      <input
        onChange={handleSelect}
        type="radio"
        name="nguon_goc"
        id="#mientrung"
      />
      <label htmlFor="#mientrung">Nguồn Gốc Từ Miền Trung</label>
    </div>
    <div className="wordList__tag">
      <input
        onChange={handleSelect}
        type="radio"
        name="nguon_goc"
        id="#miennam"
      />
      <label htmlFor="#miennam">Nguồn Gốc Từ Phía Nam</label>
    </div>
  </div>
);

export default AddWordForm;
