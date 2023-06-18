import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineCheck,
} from "react-icons/ai";

function DayProduct({ ele, num, setNum, order }) {
  const [openProduct, setOpenProduct] = useState(false);
  const [totalPrice, setTotalPrice] = useState(false);
  const popUp = useRef();
  useEffect(() => {
    let total = 0;
    ele.product.forEach((e) => {
      total += e.price * e.num;
    });
    setTotalPrice(total);
  }, [ele]);
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (popUp.current && !popUp.current.contains(e.target)) {
        setOpenProduct(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [popUp]);
  const setOrder = (pro) => {
    const newProd = { ...pro };
    delete newProd.id;
    axios
      .post(`${process.env.API_URL}/order`, {
        ...newProd,
      })
      .then((_) => {
        axios.delete(`${process.env.API_URL}/drivery/${ele.id}`).then((_) => {
          setNum(num + 1);
        });
      });
  };
  return (
    <>
      <div
        ref={popUp}
        key={ele.id}
        className=" px-4 py-2 || flex || border-b || border-[#e0e0e0] || cursor-pointer || hover:bg-gray-100 || duration-500"
      >
        <h2 className="min-w-[10%] max-w-[10%] w-[10%]  ">{ele.time}</h2>
        <h2 className="min-w-[20%] max-w-[20%] w-[20%] ">{ele.number}</h2>
        <h2 className="min-w-[40%] max-w-[40%] w-[40%] || px-2">
          {ele.location}
        </h2>
        <h2 className="min-w-[10%] max-w-[10%] w-[10%]  ">
          {ele.productNumber}
        </h2>
        <h2
          className="min-w-[10%] max-w-[10%] w-[10%]  || text-green-500 || hover:text-green-900 || duration-500"
          onClick={() => {
            if (!order) {
              setOrder(ele);
            }
          }}
        >
          {order ? (
            <span className="flex || justify-center">{totalPrice} EGP</span>
          ) : (
            <AiOutlineCheck className="text-xl || mx-auto" />
          )}
        </h2>
        <h2
          className="min-w-[10%] max-w-[10%] w-[10%]  || text-center"
          onClick={() => setOpenProduct(!openProduct)}
        >
          {openProduct ? (
            <AiOutlineArrowUp className="mx-auto || text-xl" />
          ) : (
            <AiOutlineArrowDown className="mx-auto || text-xl" />
          )}
        </h2>
      </div>
      {openProduct && (
        <div className="">
          <div className="relative">
            <div className="flex || gap-2 || items-center || flex-row-reverse || w-full || bg-slate-800 || text-white || border-b border-gray-100">
              <div className="w-full || py-[10px] || text-center">
                <p className="text-[14px] || mb-2">أسم المنتج</p>
              </div>
              <div className="relative w-full || text-center">العدد</div>
              {order && (
                <div className="relative w-full || text-center">السعر</div>
              )}
            </div>
          </div>
          {ele.product.map((element) => (
            <div className="relative" key={element.id}>
              <div className="flex || gap-2 || items-center || flex-row-reverse || w-full || border-b border-gray-100">
                <div className="w-full || py-[10px] || text-center">
                  <p className="text-[14px] || mb-2">{element.name}</p>
                </div>
                <div className="relative w-full || text-center">
                  {element.num}
                </div>
                {order && (
                  <div className="relative w-full || text-center">
                    {element.num*element.price} EGP
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default DayProduct;
