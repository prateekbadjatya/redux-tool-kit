import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";
const Modal = () => {
  const dispatch = useDispatch();
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Remove All Item from your Shopping Cart?</h4>
        <div className="btn-container">
          <button 
           onClick={() => {dispatch(closeModal())
            dispatch(clearCart())}
        }
          className="btn confirm-btn" type="button">
            Confirm
          </button>
          <button
            onClick={() => dispatch(closeModal())}
            className="btn clear-btn"
            type="button"
          >
            Cancel
          </button>
        </div>
        {/* <div className="modal-content"></div> */}
      </div>
    </aside>
  );
};

export default Modal;
