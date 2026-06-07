import { useState } from "react";
import Loading from "./Loading";

const Carousel = ({
  images,
  isLoading,
  customPrevBtn,
  customNextBtn,
  imageLimit = images.length,
  imagePerSlide = 1,
}) => {
  const [curr, setCurr] = useState(0);
  const visibleImageCount = Math.min(imageLimit, images.length);
  const maxIndex = Math.max(0, visibleImageCount - imagePerSlide);

  const handlePrev = () => {
    setCurr((current) => (current === 0 ? maxIndex : current - 1));
  };

  const handleNext = () => {
    setCurr((current) => (current === maxIndex ? 0 : current + 1));
  };
  if (isLoading) return <Loading />;
  console.log(images);
  if (images.length <= 0) return <h1>Sorry No Image Available</h1>;
  return (
    <>
      <div
        className="carousel"
        style={{
          height: "100%",
          overflow: "hidden",
        }}
      >
        <div
          className="image-container"
          style={{
            transform: `translateX(-${(curr * 100) / imagePerSlide}%)`,
            transition: "transform 0.3s ease",
          }}
        >
          {images
            .slice(0, imageLimit > images.length ? images.length : imageLimit)
            .map((img) => {
              return (
                <img
                  key={img.id}
                  src={img.url}
                  alt={img.title}
                  className="image"
                  style={{ flex: `0 0 ${100 / imagePerSlide}%` }}
                />
              );
            })}
        </div>
        <button onClick={handlePrev} className="btn prev">
          Go To Prev
        </button>
        <button onClick={handleNext} className="next btn">
          Go To Next
        </button>
      </div>
    </>
  );
};
export default Carousel;
