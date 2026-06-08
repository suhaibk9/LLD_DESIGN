import React from "react";
import { ShoppingCartState } from "../context/context";
import { useMemo } from "react";
import StarRating from "./StartRating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = ShoppingCartState();
  const calcSubTotal = useMemo(() => {
    let t = 0;
    for (const item of cart) {
      t += item.price * item.qty;
    }
    return t;
  }, [cart]);
  const handleDeleteProd = (prodId) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: prodId } });
  const handleQtyChange = (action, qty, prodId) => {
    if (action === "sub") {
      if (qty === 1) handleDeleteProd(prodId);
      else
        dispatch({
          type: "CHANGE_CART_QTY",
          payload: { id: prodId, newQty: qty - 1 },
        });
    } else
      dispatch({
        type: "CHANGE_CART_QTY",
        payload: { id: prodId, newQty: qty + 1 },
      });
  };
  return (
    <div className="py-9 flex flex-col gap-5">
      <div className="text-2xl text-center">
        {" "}
        Sub Total : ${calcSubTotal.toFixed(2)}
      </div>
      {cart.map((prod) => {
        return (
          <span
            key={prod.id}
            className="flex h-36 items-center justify-between border-2 p-5 mx-10"
          >
            <img
              src={prod.thumbnail}
              alt={prod.title}
              className="h-full w-48 object-contain"
            />
            <div className="flex flex-col justify-start items-start">
              <span>{prod.title}</span>
              <span>{prod.price}</span>
              <span>{prod.qty}</span>
            </div>
            <StarRating rating={prod.rating} size={5} />
            <div className="flex flex-col">
              <button
                className="p-1 bg-red-800 text-white rounded-sm"
                onClick={() => handleDeleteProd(prod.id)}
              >
                Remove from cart
              </button>
              <span className="flex p-2 justify-center items-center gap-1">
                <button
                  onClick={() => handleQtyChange("add", prod.qty, prod.id)}
                  className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center cursor-pointer active:scale-95"
                >
                  +
                </button>
                <input
                  className="w-12 h-8 text-center border border-gray-300 bg-gray-50 text-gray-800 rounded font-semibold focus:outline-none"
                  disabled
                  value={prod.qty}
                />
                <button
                  onClick={() => handleQtyChange("sub", prod.qty, prod.id)}
                  className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center cursor-pointer active:scale-95"
                >
                  -
                </button>
              </span>
            </div>
          </span>
        );
      })}
    </div>
  );
};

export default Cart;
