import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, calculateTotal } from "../features/cart/cartSlice";
import { openModal } from "../features/modal/modalSlice";
import CartItem from "./CartItem";
import Modal from "./Modal";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, amount, total } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your Bag</h2>
          <h4 className="empty-cart">Is currently empty</h4>
        </header>
      </section>
    );
  }

  //Modal

  return (
    <section className="cart">
      {isOpen && <Modal />}
      <header>
        <h2>Your Bag</h2>
      </header>
      <div>
        {cartItems.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button onClick={() => dispatch(openModal())} className="btn clear-btn">
          Clear cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
