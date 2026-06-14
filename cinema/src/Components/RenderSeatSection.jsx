import React from "react";

const UIColors = {
  booked: "#e5e7eb", // Light Grey
  selected: "#2563eb", // Vibrant Royal Blue
};

const RenderSeatSection = ({
  seatRow,
  startIdx,
  endIdx,
  selectedSeats = [],
  onClick = () => {},
}) => {
  console.log(seatRow);
  const getClassName = (isBooked, isSelected) => {
    // Base classes shared by all states
    const baseClasses =
      "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 m-1 rounded-t-lg border-2 transition-all duration-200 flex items-center justify-center text-xs sm:text-sm font-bold";

    if (isBooked) {
      return `${baseClasses} border-gray-300 text-gray-400 cursor-not-allowed`;
    }
    if (isSelected) {
      return `${baseClasses} border-blue-700 text-white cursor-pointer`;
    }
    // Available state (Your original styling)
    return `${baseClasses} border-blue-300 text-blue-800 cursor-pointer`;
  };

  return (
    <div className="flex">
      {seatRow.slice(startIdx, endIdx).map((seat, idx) => {
        const isBooked = seat.status === "Booked";
        const isSelected = selectedSeats.includes(seat.id);

        // Determine background color priority
        let bgColor = seat.color; // Default tier color (e.g., #fee2e2)
        if (isBooked) bgColor = UIColors.booked;
        if (isSelected) bgColor = UIColors.selected;

        return (
          <div
            aria-label={`Seat Number ${seat.id} Seat Type: ${seat.type} Price:${seat.price} Status:${seat.status}`}
            key={seat.id}
            style={{ backgroundColor: bgColor }}
            className={getClassName(isBooked, isSelected)}
            onClick={() => !isBooked && onClick(seat.row, idx + startIdx)} // Prevent clicks on booked seats
          >
            {startIdx + idx + 1}
          </div>
        );
      })}
    </div>
  );
};

export default RenderSeatSection;
