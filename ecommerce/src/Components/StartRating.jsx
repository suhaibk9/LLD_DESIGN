import { useState } from "react";

const StarRating = ({ size, rating = 0, onChange }) => {
  const isInteractive = typeof onChange === "function";
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
              onMouseEnter={
                isInteractive ? () => handleMouseHover(idx + 1) : undefined
              }
              onMouseLeave={
                isInteractive ? () => handleMouseHover(0) : undefined
              }
              onClick={isInteractive ? () => onChange(idx + 1) : undefined}
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
