import React, { useEffect, useMemo, useState } from "react";
import RenderSeatSection from "./RenderSeatSection";
const colors = {
  regular: "blue",
  premium: "red",
  vip: "green",
};
const seatColors = {
  blue: "#dbeafe", // Soft Sky Blue (Tailwind blue-100)
  red: "#fee2e2", // Soft Blush Red/Pink (Tailwind red-100)
  green: "#dcfce7", // Soft Mint Green (Tailwind green-100)
};
const UIColors = {
  booked: "#e5e7eb", // Light Grey
  selected: "#2563eb", // Vibrant Royal Blue
};

const CinemaSeatBooking = ({
  layout = {
    rows: 8,
    seatPerRow: 12,
    aislePosition: 6,
  },
  seatTypes = {
    regular: { name: "Regular", price: 150, rows: [0, 1, 2] },
    premium: { name: "Premium", price: 250, rows: [3, 4, 5] },
    vip: { name: "VIP", price: 350, rows: [6, 7] },
  },
  bookedSeates = ["C2", "C4", "A1"],
  currency = "$",
  onBookingComplete = () => {},
  title = "Cinema Hall Booking",
  subTitle = "Select your preferred Seats",
}) => {
  const getSeatType = (row) => {
    for (const type in seatTypes) {
      if (seatTypes[type].rows.includes(row))
        return {
          type: seatTypes[type].name,
          price: seatTypes[type].price,
          color: seatColors[colors[type]],
        };
    }
  };
  const initialiseSeates = useMemo(() => {
    const seats = [];
    for (let row = 0; row < layout.rows; row++) {
      const seatRow = [];
      const seatType = getSeatType(row);
      for (let seat = 0; seat < layout.seatPerRow; seat++) {
        const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;
        seatRow.push({
          id: seatId,
          row,
          seat,
          type: seatType?.type || "regular",
          price: seatType?.price || 150,
          color: seatType?.color || "blue",
          status: bookedSeates.includes(seatId) ? "Booked" : "Available",
        });
      }

      seats.push(seatRow);
    }
    return seats;
  }, [layout, bookedSeates, seatTypes]);

  const [seats, setSeats] = useState(initialiseSeates);
  console.log("FULL", seats);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const handleSeatClick = (rowIdx, seatIdx) => {
    const clickedSeat = seats[rowIdx][seatIdx];
    if (clickedSeat.status === "Available") {
      //Seat Was Already Selected so remove selection
      if (selectedSeats.includes(clickedSeat.id)) {
        setSelectedSeats((prev) =>
          prev.filter((selectedIds) => selectedIds != clickedSeat.id),
        );
      } else {
        //Seat Not yet Selected
        setSelectedSeats((prev) => [...prev, clickedSeat.id]);
      }
    }
  };

  const getPriceBreakdown = () => {
    const summary = {};

    selectedSeats.forEach((seatId) => {
      // 1. Find the seat object matching the ID (e.g., "A2")
      const seatObj = seats.flat().find((s) => s.id === seatId);

      if (seatObj) {
        const type = seatObj.type; // e.g., "Premium"
        const price = seatObj.price; // e.g., 250

        // 2. Add the price to that type's total running tally
        if (summary[type]) {
          summary[type] += price;
        } else {
          summary[type] = price;
        }
      }
    });

    // Returns an object that looks like: { Regular: 300, Premium: 250 }
    return summary;
  };
  const handleBooking = () => {
    setSeats((prev) => {
      return prev.map((row) => {
        return row.map((seat) => {
          return {
            ...seat,
            status: selectedSeats.includes(seat.id) ? "Booked" : seat.status,
          };
        });
      });
    });
    setSelectedSeats([]);
  };
  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      {/* title */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-center mb-2 text-gray-800">
          {title}
        </h1>
        <p className="text-xl lg:text-2xl text-center text-gray-600 mb-6 ">
          {subTitle}
        </p>
      </div>
      {/* screen */}
      <div className="mb-8">
        <div className="w-full h-4 bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 mb-2 shadow-inner rounded-lg"></div>
        <p className="text-center text-lg text-gray-500 font-medium">Screen</p>
      </div>
      {/* seatmap */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex flex-col items-center min-w-max">
          {seats.map((row, index) => {
            return (
              <div key={index} className="flex items-center mb-2">
                <span className="w-8 text-center font-bold text-gray-600 mr-4">
                  {String.fromCharCode(65 + index)}
                </span>
                {/* Left Side */}
                <RenderSeatSection
                  seatRow={row}
                  startIdx={0}
                  endIdx={layout.aislePosition}
                  onClick={handleSeatClick}
                  selectedSeats={selectedSeats}
                />
                {/* Aisle */}
                <div className="w-8" />
                {/* Right Side */}
                <RenderSeatSection
                  seatRow={row}
                  startIdx={layout.aislePosition}
                  endIdx={layout.seatPerRow}
                  onClick={handleSeatClick}
                  selectedSeats={selectedSeats}
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Dynamic Legend */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-4 mt-6 flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-700">
        {/* Status Indicators */}
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-t-md border border-gray-300"
            style={{ backgroundColor: UIColors.booked }}
          />
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-t-md border border-blue-700"
            style={{ backgroundColor: UIColors.selected }}
          />
          <span>Selected</span>
        </div>

        {/* Divider if items exist */}
        <div className="w-px bg-gray-200 self-stretch hidden sm:block" />

        {/* Dynamic Tier Indicators */}
        {Object.entries(seatTypes).map(([key, value]) => {
          const hexColor = seatColors[colors[key] || "blue"];

          return (
            <div key={key} className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-t-md border border-blue-300"
                style={{ backgroundColor: hexColor }}
              />
              <span>
                {value.name} ({currency}
                {value.price})
              </span>
            </div>
          );
        })}
      </div>
      {/* Seat Summary */}
      {/* Booking Summary Section */}
      {selectedSeats.length > 0 && (
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-6 flex flex-col md:flex-row justify-between items-center gap-6 animate-fade-in">
          {/* Summary Breakdown */}
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <h3 className="text-lg font-bold text-gray-800">Booking Summary</h3>

            <p className="text-gray-600">
              Selected Seats:
              <span className="font-semibold text-gray-800">
                {selectedSeats.join(", ")}
              </span>
              ({selectedSeats.length}
              {selectedSeats.length === 1 ? "seat" : "seats"})
            </p>

            {/* Itemized Price Breakdown per Seat Type */}
            <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
              {Object.entries(getPriceBreakdown()).map(([type, total]) => (
                <span key={type}>
                  {type}: {currency}
                  {total}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
            <div className="text-right">
              <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
                Total Price
              </p>
              <p className="text-2xl lg:text-3xl font-black text-blue-600">
                {currency}
                {selectedSeats.reduce((total, seatId) => {
                  const seatObj = seats.flat().find((s) => s.id === seatId);
                  return total + (seatObj?.price || 0);
                }, 0)}
              </p>
            </div>

            <button
              disabled={selectedSeats.length === 0}
              onClick={handleBooking}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-base font-bold rounded-lg shadow-md hover:shadow-lg transform active:scale-98 transition-all duration-150 cursor-pointer w-full md:w-auto text-center"
            >
              Book Tickets
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CinemaSeatBooking;
