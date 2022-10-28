import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { getCartItems } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  const {isLoading } = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <main>
      {/* <Modal/> */}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
