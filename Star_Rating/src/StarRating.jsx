import { useState } from "react";

const StarRating = ({ size, rating, onChange }) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const handleMouseHover = (val) => setHoveredRating(val);
  return (
    <div className="star-rating">
      {Array(size)
        .fill("")
        .map((_, idx) => {
          const startClass = "star";

          return (
            <span
              key={idx}
              title={`${idx + 1} Star${idx > 0 ? "s" : ""}`}
              className={startClass}
              onMouseEnter={() => handleMouseHover(idx + 1)}
              onMouseLeave={() => handleMouseHover(0)}
              onClick={() => onChange(idx + 1)}
            >
              {/* {idx < (hoveredRating || rating) ? "★" : "☆"} */}
              {idx < (hoveredRating > 0 ? hoveredRating : rating) ? "★" : "☆"}
            </span>
          );
        })}
    </div>
  );
};
export default StarRating;
