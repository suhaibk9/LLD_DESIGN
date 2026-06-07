import { useState } from "react";
import Carousel from "./Carousel";
import { useEffect } from "react";
import "./App.css";
function convertPhotoUrls(photos) {
  return photos.map((photo) => ({
    ...photo,
    url: `https://picsum.photos/seed/${photo.id}/600/600`,
    thumbnailUrl: `https://picsum.photos/seed/${photo.id}/150/150`,
  }));
}
const App = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  // https://jsonplaceholder.typicode.com/photos?limit=8
  const fetchImages = async (imgLimit) => {
    imgLimit = imgLimit ? imgLimit : "8";
    setLoading(true);
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/photos?_limit=" + imgLimit,
      );
      const data = await res.json();

      setImages(convertPhotoUrls(data));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImages(8);
  }, []);
  return (
    <div className="carousel-container">
      <Carousel
        images={images}
        isLoading={loading}
        // customPrevBtn={}
        // customNextBtn={}
        // imageLimit={}
        // imagePerSlide={}
      />
    </div>
  );
};
export default App;
