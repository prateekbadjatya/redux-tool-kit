import React, { useEffect } from "react";
import { ChevronDown, ChevronUp } from "../icons";
import { useDispatch } from "react-redux";
import { clearCart, removeItem, increase, decrease } from "../features/cart/cartSlice";

const CartItem = ({ id, img, title, price, amount }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if(!amount) {
      dispatch(removeItem(id)) 
    }
  }, [amount])

  return (
    <article className="cart-item">
      <img src={img} alt={title}></img>
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button onClick={() => dispatch(removeItem(id))} className="remove-btn">
          remove
        </button>
      </div>
      <div>
        <button className="amount-btn" onClick={() => dispatch(increase(id))}>
          <ChevronUp />
        </button>
        <p className="amount"> {amount}</p>
        <button className="amount-btn" onClick={() => { !amount ? dispatch(removeItem(id)) :  dispatch(decrease(id))}}>
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
