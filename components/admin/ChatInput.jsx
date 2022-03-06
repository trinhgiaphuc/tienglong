import ImagePreview from './ImagePreview';

const ChatInput = ({ content, setContent }) => {
  return (
    <div className="my-border col-span-10 text-responsive relative">
      {/* {content.image.length === 0 ? null : (
        <ImagePreview setContent={setContent} src={content.image} />
      )} */}
      <input
        // onPasteCapture={e => {
        //   const file = e.clipboardData.files.item(0);
        //   const src = URL.createObjectURL(file);
        //   setContent({ ...content, image: src });
        // }}
        value={content.text}
        onChange={e => setContent({ ...content, text: e.target.value })}
        placeholder="tin nhắn..."
        className="w-full h-full px-4 outline-none"
        type="text"
      />
    </div>
  );
};

export default ChatInput;
