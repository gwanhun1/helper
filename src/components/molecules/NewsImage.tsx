import news1 from "/news1.png";

const NewsImage = () => {
  return (
    <div className="news-image h-full w-full overflow-hidden">
      <img src={news1} alt="news" className="w-68 h-36 bg-red-200" />
    </div>
  );
};

export default NewsImage;

// 권장 사이즈
//width: 272px
//height: 144px
// -> 592x272
