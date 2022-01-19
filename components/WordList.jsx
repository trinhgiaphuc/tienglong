import WordCard from './WordCard';

const words = [
  `Ám chỉ phái nữ trong mối quan hệ tình yêu (đã kết hôn hoặc đang trong
        giai đoạn hẹn hò). Từ này được xuất phát từ câu`,
  `Ám chỉ phái nữ trong mối quan hệ tình yêu (đã kết hôn hoặc đang trong
        giai đoạn hẹn hò). Từ này được xuất phát từ câu: &quot;Nhà là phải có
        nóc&quot;, ban đầu được sử dụng nhằm thể hiện quyền lực của đàn ông
        trong một mối quan hệ  Từ này được xuất phát từ câu: &quot;Nhà là phải có
        nóc&quot;, ban đầu được sử dụng nhằm thể hiện quyền lực của đàn ông
        trong một mối quan hệ, nhưng trải qua nhiều câu chuyện thực tế, định
        nghĩa nóc nhà dần được sử dụng để đề cập đến phụ nữ. Từ này được xuất phát từ câu: &quot;Nhà là phải có
        nóc&quot;, ban đầu được sử dụng nhằm thể hiện quyền lực của đàn ông
        trong một mối quan hệ, nhưng trải qua nhiều câu chuyện thực tế, định
        nghĩa nóc nhà dần được sử dụng để đề cập đến phụ nữ.Ám chỉ phái nữ trong mối quan hệ tình yêu (đã kết hôn hoặc đang trong
        giai đoạn hẹn hò). Từ này được xuất phát từ câu: &quot;Nhà là phải có
        nóc&quot;, ban đầu được sử dụng nhằm thể hiện quyền lực của đàn ông
        trong một mối quan hệ  Từ này được xuất phát từ câu: &quot;Nhà là phải có
        nóc&quot;, ban đầu được sử dụng nhằm thể hiện quyền lực của đàn ông
        trong một mối quan hệ, nhưng trải qua nhiều câu chuyện thực tế, định
        nghĩa nóc nhà dần được sử dụng để đề cập đến phụ nữ. Từ này được xuất phát từ câu: &quot;Nhà là phải có
        nóc&quot;, ban đầu được sử dụng nhằm thể hiện quyền lực của đàn ông
        trong một mối quan hệ, nhưng trải qua nhiều câu chuyện thực tế, định
        nghĩa nóc nhà dần được sử dụng để đề cập đến phụ nữ.Ám chỉ phái nữ trong mối quan hệ tình yêu (đã kết hôn hoặc đang trong
        giai đoạn hẹn hò). Từ này được xuất phát từ câu: &quot;Nhà là phải có
        nóc&quot;, ban đầu được sử dụng nhằm thể hiện quyền lực của đàn ông
        trong một mối quan hệ  Từ này được xuất phát từ câu: &quot;Nhà là phải có
        nóc&quot;, ban đầu được sử dụng nhằm thể hiện quyền lực của đàn ông
        trong một mối quan hệ, nhưng trải qua nhiều câu chuyện thực tế, định
        nghĩa nóc nhà dần được sử dụng để đề cập đến phụ nữ. Từ này được xuất phát từ câu: &quot;Nhà là phải có
        nóc&quot;, ban đầu được sử dụng nhằm thể hiện quyền lực của đàn ông
        trong một mối quan hệ, nhưng trải qua nhiều câu chuyện thực tế, định
        nghĩa nóc nhà dần được sử dụng để đề cập đến phụ nữ.`,
  `Ám chỉ phái nữ trong mối quan hệ tình yêu (đã kết hôn hoặc đang trong
        giai đoạn hẹn hò). Từ này được xuất phát từ câu: &quot;Nhà là phải có
        nóc&quot;, ban đầu được sử dụng nhằm thể hiện quyền lực của đàn ông
        trong một mối quan hệ, nhưng trải qua nhiều câu chuyện thực tế, định
        nghĩa nóc nhà dần được sử dụng để đề cập đến phụ nữ.`,
  `Mình thấy cuộc trò chuyện đêm khuya này rất hay ý của cô Thảo Vân. Cũng là một người con gái nên mình hiểu các bạn con gái bây giờ như thế nào. Con gái bây giờ có một khái niệm là chọn gu, chính xác là chọn mẫu con trai `,
  `Ám chỉ phái nữ trong mối quan hệ tình yêu (đã kết hôn hoặc đang trong
        giai đoạn hẹn hò). Từ này được xuất phát từ câu: &quot;Nhà là phải có
        nóc&quot;, ban đầu được sử dụng nhằm thể hiện quyền lực của đàn ông
        trong một mối quan hệ, nhưng trải qua nhiều câu chuyện thực tế, định
        nghĩa nóc nhà dần được sử dụng để đề cập đến phụ nữ.`,
  `Ám chỉ phái nữ trong mối quan hệ tình yêu (đã kết hôn hoặc đang trong
        giai đoạn hẹn hò). Từ này được xuất phát từ câu: &quot;Nhà là phải có
        nóc&quot;, ban đầu được sử dụng nhằm thể hiện quyền lực của đàn ông
        trong một mối quan hệ, nhưng trải qua nhiều câu chuyện thực tế, định
        nghĩa nóc nhà dần được sử dụng để đề cập đến phụ nữ.`,
  `Mình thấy cuộc trò chuyện đêm khuya này rất hay ý của cô Thảo Vân. Cũng là một người con gái nên mình hiểu các bạn con gái bây giờ như thế nào. Con gái bây giờ có một khái niệm là chọn gu, chính xác là chọn mẫu con trai `,
  `Ám chỉ phái nữ trong mối quan hệ tình yêu (đã kết hôn hoặc đang trong
        giai đoạn hẹn hò). Từ này được xuất phát từ câu: &quot;Nhà là phải có
        nóc&quot;, ban đầu được sử dụng nhằm thể hiện quyền lực của đàn ông
        trong một mối quan hệ, nhưng trải qua nhiều câu chuyện thực tế, định
        nghĩa nóc nhà dần được sử dụng để đề cập đến phụ nữ.`,
  `Ám chỉ phái nữ trong mối quan hệ tình yêu (đã kết hôn hoặc đang trong
        giai đoạn hẹn hò). Từ này được xuất phát từ câu: &quot;Nhà là phải có
        nóc&quot;, ban đầu được sử dụng nhằm thể hiện quyền lực của đàn ông
        trong một mối quan hệ, nhưng trải qua nhiều câu chuyện thực tế, định
        nghĩa nóc nhà dần được sử dụng để đề cập đến phụ nữ.`,
];

const WordList = () => {
  let className = '';

  return (
    <ul className="my-border card-list">
      {words.map((word, i) => {
        if (i === 0) className = 'col-span-5 row-span-2 hover:bg-red-300';
        if (i === 1) className = 'col-span-4 row-span-2 hover:bg-green-300';
        if (i === 2) className = 'col-span-3 row-span-2 hover:bg-blue-300';
        if (i === 3) className = 'col-span-3 row-span-2 hover:bg-blue-300';
        if (i === 4) className = 'col-span-4 row-span-2 hover:bg-red-300';
        if (i === 5) className = 'col-span-5 row-span-2 hover:bg-green-300';
        if (i === 6) className = 'col-span-4 row-span-2 hover:bg-green-300';
        if (i === 7) className = 'col-span-4 row-span-2 hover:bg-blue-300';
        if (i === 8) className = 'col-span-4 row-span-2 hover:bg-red-300';
        return (
          <li className={`my-border ${className}`} key={i}>
            <WordCard word={word} />
          </li>
        );
      })}
    </ul>
  );
};

export default WordList;
