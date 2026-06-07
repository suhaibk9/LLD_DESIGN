import { useEffect } from "react";
import { useState } from "react";

const ProgressBar = ({ value = 0, onComplete }) => {
  useEffect(() => {
    if (value === 100) onComplete();
  }, [value]);
  return (
    <div className="progress">
      <span style={{ color: value > 49 ? "white" : "black" }}>
        {value.toFixed()}%
      </span>
      <div
        role="progressbar"
        style={{ transform: `translateX(${value - 100}%)` }}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value.toFixed()}
      />
    </div>
  );
};
export default ProgressBar;
