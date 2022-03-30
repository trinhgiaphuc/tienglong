import { addNewDefinition } from '@lib/db';
import { useAuth } from '@lib/userContext';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AddWordForm = () => {
  const { username } = useAuth();
  const router = useRouter();

  const [otherTags, setOtherTags] = useState({ tag: '', tagList: [] });
  const [error, setError] = useState({ isError: false, errorDetails: '' });
  const [recommendedTag, setRecommendedTag] = useState({
    source: '',
    trend: '',
  });

  function tagCombiner(...tags) {
    const finalTags = [];
    tags.forEach(tag => {
      if (typeof tag === 'string' && tag.length !== 0) finalTags.push(tag);
    });
    return finalTags;
  }
  function shallowCheck(wordData) {
    for (let data in wordData) {
      if (typeof data !== 'string') return;
    }
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form);
    const { word, definition, example, releaseYear } = formData;
    const combinedTags = tagCombiner(
      formData.source,
      formData.trend,
      ...otherTags.tagList
    );

    console.log(word);
    console.log(definition);
    console.log(example);
    console.log(combinedTags);
    console.log(username);

    // const res = await addNewDefinition({
    //   word,
    //   definition,
    //   example,
    //   tags: combinedTags,
    //   author: username,
    // });

    // if (res.success) {
    //   router.push('/define/success');
    // } else if (!res.success) {
    //   console.log(res);
    //   router.push('/define/fail');
    // }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="my-border p-5 sm:p-10  w-full flex-center flex-col md:grid grid-cols-10 gap-10"
    >
      <input
        className="adding-word-input p-4 col-span-5"
        name="word"
        placeholder="Từ ngữ"
        minLength={2}
        maxLength={150}
        type="text"
        spellCheck={false}
      />

      <textarea
        rows={15}
        maxLength={5000}
        className="adding-word-input resize-none col-span-5 row-span-4"
        name="definition"
        placeholder="Định nghĩa"
        minLength={5}
        type="text"
        spellCheck={false}
      />
      <textarea
        rows={8}
        minLength={5}
        maxLength={5000}
        className="adding-word-input resize-none col-span-5"
        name="example"
        placeholder="Ví Dụ"
        type="text"
        spellCheck={false}
      />

      <div className="adding-word-input col-span-5 relative flex flex-col sm:flex-row group">
        <input
          className="input border-none w-full p-5 peer"
          placeholder="Nhập từng thẻ sau đó ấn đính thẻ. (#Iambeautiful)"
          maxLength={200}
          value={otherTags.tag}
          autoComplete="off"
          onChange={e =>
            setOtherTags({
              ...otherTags,
              tag: e.target.value.trim().replace(' ', ''),
            })
          }
          name="otherTags"
        />

        <button
          type="button"
          onClick={() => {
            if (otherTags.tag.length > 1) {
              setOtherTags({
                tagList: [...otherTags.tagList, otherTags.tag],
                tag: '',
              });
            }
          }}
          className="my-border rounded min-w-max text-xs font-medium py-4 sm:text-inherit sm:px-2 sm:py-0 bg-orange-400 shadow-sm shadow-black animate-btn-scale"
        >
          Đính Thẻ
        </button>

        <div className="selector group-hover:-translate-y-full rounded group-hover:z-10 peer-focus:z-10 peer-focus:-translate-y-full">
          <div className="my-border py-4 col-span-2 text-center text-black uppercase bg-lime-200">
            Một số thẻ gợi ý
          </div>
          <SelectTrendTag tag={recommendedTag} setTag={setRecommendedTag} />
          <SelectSourceTag tag={recommendedTag} setTag={setRecommendedTag} />
          <button
            onClick={() => setRecommendedTag({ source: '', trend: '' })}
            type="button"
            className="my-border col-span-2 py-4 outline-none font-medium hover:bg-gray-500"
          >
            Bỏ Chọn Tất Cả Thẻ Gợi Ý
          </button>
        </div>

        <ul className="absolute bottom-full left-0 flex gap-3 max-w-full overflow-hidden whitespace-nowrap overflow-ellipsis">
          {[...otherTags.tagList].reverse().map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>

      <div className="col-span-5 my-border rounded flex">
        <ul className="flex-grow border-r-2 border-black flex items-center p-4">
          <li className="italic font-bold text-zinc-700">#2022</li>
          {[...otherTags.tagList].reverse().map(tag => (
            <li className="italic font-bold text-zinc-700" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
        <SelectYearTag />
      </div>

      <div className="my-1 sm:my-0 col-span-10 w-full">
        {/* TODO: ANIMATION */}
        <button
          type="submit"
          className="my-border rounded w-full bg-black text-white p-4 font-medium uppercase active:animate-shrink"
        >
          Định Nghĩa
        </button>
      </div>
    </form>
  );
};

const SelectYearTag = () => {
  const years = [];
  const thisYear = new Date().getFullYear();

  for (let i = 2000; i <= thisYear; i++) {
    years.push(i);
  }

  return (
    <div className="col-span-1 h-full flex justify-center">
      <div className="h-full">
        <select
          className="appearance-none block rounded h-full p-4 min-w-max font-medium bg-white outline-none"
          aria-label=""
        >
          <option hidden value={new Date().getFullYear()}>
            Năm Tạo Ra ({new Date().getFullYear()})
          </option>
          <option className="prose p-1 font-medium" value="DiSản">
            Di Sản
          </option>
          {years.map(year => (
            <option
              className="prose p-1 font-medium tracking-wide"
              key={year}
              value={year}
            >
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <select
      className="outline-none font-medium p-2 sm:p-4 tracking-wide"
      name="releaseYear"
      id="select_year"
    ></select>
  );
};

const SelectTrendTag = ({ tag, setTag }) => (
  <div className="my-border flex flex-col ">
    <div className="wordList__tag">
      <input
        onChange={e => setTag(p => ({ ...p, trend: e.target.value }))}
        className="peer hidden"
        type="radio"
        checked={tag.trend === 'khongloithoi'}
        name="trend"
        value="khongloithoi"
        id="#khongloithoi"
      />
      <label
        className="radio-label peer-checked:bg-blue-400"
        htmlFor="#khongloithoi"
      >
        Không Lỗi Thời
      </label>
    </div>

    <hr />

    <div className="wordList__tag">
      <input
        onChange={e => setTag(p => ({ ...p, trend: e.target.value }))}
        className="peer hidden"
        type="radio"
        checked={tag.trend === 'dangthinhhanh'}
        name="trend"
        value="dangthinhhanh"
        id="#dangthinhhanh"
      />
      <label
        htmlFor="#dangthinhhanh"
        className="radio-label peer-checked:bg-blue-400"
      >
        Đang Thịnh Hành
      </label>
    </div>
    <hr />

    <div className="wordList__tag">
      <input
        onChange={e => setTag(p => ({ ...p, trend: e.target.value }))}
        className="peer hidden"
        type="radio"
        checked={tag.trend === 'khongconphobien'}
        name="trend"
        value="khongconphobien"
        id="#khongconphobien"
      />
      <label
        htmlFor="#khongconphobien"
        className="radio-label peer-checked:bg-blue-400"
      >
        Không Còn Phổ Biến
      </label>
    </div>
  </div>
);

const SelectSourceTag = ({ tag, setTag }) => (
  <div className="my-border flex flex-col">
    <div className="wordList__tag">
      <input
        onChange={e => setTag(p => ({ ...p, source: e.target.value }))}
        className="peer hidden"
        type="radio"
        checked={tag.source === 'mienbac'}
        name="source"
        value="mienbac"
        id="#mienbac"
      />
      <label className="radio-label peer-checked:bg-red-400" htmlFor="#mienbac">
        Nguồn Gốc Từ Phía Bắc
      </label>
    </div>
    <hr />
    <div className="wordList__tag">
      <input
        onChange={e => setTag(p => ({ ...p, source: e.target.value }))}
        className="peer hidden"
        type="radio"
        checked={tag.source === 'mientrung'}
        name="source"
        value="mientrung"
        id="#mientrung"
      />
      <label
        className="radio-label peer-checked:bg-red-400"
        htmlFor="#mientrung"
      >
        Nguồn Gốc Từ Miền Trung
      </label>
    </div>
    <hr />
    <div className="wordList__tag">
      <input
        onChange={e => setTag(p => ({ ...p, source: e.target.value }))}
        className="peer hidden"
        type="radio"
        checked={tag.source === 'miennam'}
        name="source"
        value="miennam"
        id="#miennam"
      />
      <label className="radio-label peer-checked:bg-red-400" htmlFor="#miennam">
        Nguồn Gốc Từ Phía Nam
      </label>
    </div>
  </div>
);

export default AddWordForm;
