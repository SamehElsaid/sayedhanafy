import React, { useEffect, useState } from "react";
import BtnNumber from "./BtnNumber";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./cartAction";
import { REFRESH } from "../redux/cartSlice/cartSlice";
const style = {
  btn: `border || border-mainColor || px-[16px] || py-[6px] || text-sm || text-mainColor || rounded-full || hover:bg-mainColor || hover:text-white || duration-500`,
};
function HomeBtn({ product }) {
  const dispatch = useDispatch();
  const [num, setNum] = useState(0);
  const cart = useSelector((redux) => redux.cart);
  useEffect(() => {
    if (cart.data.products) {
      const findNum = cart.data.products.find((ele) => ele.id === product.id);
      if (findNum) {
        setNum(findNum.num);
      }else{
        setNum(0)
      }
    }
  }, [cart, cart.refresh, product.id]);

  return (
    <div>
      {num === 0 ? (
        <button
          onClick={() => {
            addToCart({ ...product, num: num + 1 }, num + 1).then((res) => {
              dispatch(REFRESH(cart.refresh + 1));
            });
          }}
          className={style.btn}
        >
          {product.price} ج.م
        </button>
      ) : (
        <BtnNumber num={num} setNum={setNum} check={true} product={product} />
      )}
    </div>
  );
}

export default HomeBtn;
