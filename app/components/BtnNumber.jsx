import React from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { REFRESH } from "../redux/cartSlice/cartSlice";
import { addToCart, minCart } from "./cartAction";

function BtnNumber({ num, setNum, check, product }) {
  const cart = useSelector((redux) => redux.cart);
  const dispatch = useDispatch();
  
  return (
    <div className="flex || items-center || justify-center">
      <button>
        <AiOutlinePlusCircle
          onClick={() => {
            if (check) {
              addToCart({ ...product, num: 1 }, 1).then((res) => {
                dispatch(REFRESH(cart.refresh + 1));
              });
            }else{
            setNum(num + 1);
            }
          }}
          className="text-xl || cursor-pointer"
        />
      </button>
      <p className="min-w-[30px] || px-2 || text-center || select-none">
        {num}
      </p>
      <button className={`${num === 1 && !check && "text-gray-400"}`}>
        <AiOutlineMinusCircle
          className="text-xl || cursor-pointer "
          onClick={() => {
            if (check) {
              minCart({ ...product, num: 1 }, 1).then((res) => {
                dispatch(REFRESH(cart.refresh + 1));
              });
            } else {
              if (num !== 1) {
                setNum(num - 1);
              }
            }
          }}
        />
      </button>
    </div>
  );
}

export default BtnNumber;
