"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomeBtn from "./HomeBtn";
import Image from "next/image";
import { BsArrowRight } from "react-icons/bs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { REFRESH } from "../redux/cartSlice/cartSlice";

function Cart() {
  const cart = useSelector((redux) => redux.cart);
  const [data, setData] = useState([]);
  const router = useRouter();
  const [totalNum, setTotalNum] = useState(0);
  const popUp = useRef();
  const [numberOpen, setNumberOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const sendToDrivery = () => {
    const idCart = localStorage.getItem("idCart");

    axios.get(`${process.env.API_URL}/cart/${idCart}`).then((res) => {
      const now = new Date();
      const dateOptions = { year: "numeric", month: "numeric", day: "numeric" };
      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      const formattedDate = now.toLocaleDateString(undefined, dateOptions);
      const formattedTime = now.toLocaleTimeString(undefined, timeOptions);

      axios
        .post(`${process.env.API_URL}/drivery`, {
          product: res.data.products,
          comment: res.data.comment,
          number,
          date: formattedDate,
          productNumber:res.data.number,
          time: formattedTime,
          location: JSON.parse(
            localStorage.getItem("userLocation")
          )[2].formatted.replaceAll("unnamed road,", ""),
        })
        .then((res) => {
          toast.success("تم تاكيد الطلب");
          router.push("/");
          setNumberOpen(false);
          setNumber("");

          axios
            .patch(`${process.env.API_URL}/cart/${idCart}`, {
              products: [],
              number: 0,
              comment: "",
            })
            .then((_) => {
              dispatch(REFRESH(cart.refresh + 1));
            });
        });
    });
  };
  useEffect(() => {
    if (cart.data.products) {
      if (cart.data.products.length !== 0) {
        setData(cart.data.products);
        let total = 0;
        cart.data.products.forEach((pro) => {
          total += pro.price * pro.num;
        });
        setTotalNum(total);
      } else {
        setData([]);
        setTotalNum(0);
      }
    }
  }, [cart, cart.refresh]);

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (popUp.current && !popUp.current.contains(e.target)) {
        setNumberOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [popUp]);
  return (
    <div
      className={` overflow-y-auto || scrollStyle || min-h-[300px] || h-screen || relative || flex || flex-col || px-4`}
    >
      <div
        className={`${
          numberOpen
            ? "visible || opacity-100"
            : "invisible || opacity-0 || delay-500"
        } || overflow-hidden || transition-all || duration-500 absolute || inset-0 || bg-[#000000cc] || z-20 || flex || flex-col || justify-end`}
      >
        <div
          ref={popUp}
          className={`${
            numberOpen ? "translate-y-[0%] delay-500 " : "translate-y-[100%]"
          } transition-transform || duration-500 bg-white || pb-10 || rounded-t-lg || rounded-tl-lg || px-3`}
        >
          <p className="w-[80px] || h-[4px] || bg-[#d9d9d9] || rounded-full || mt-2 || mb-3 || mx-auto"></p>
          <h2 className="font-semibold || pb-3 || border-b || border-[#e0e0e0] || select-none">
            استمتع بأفضل تجربة مع Orderfast
          </h2>
          <h2 className="border-b-[3px] || border-[#cb7901] || h-[50px] || flex || items-center || justify-center || mx-4 || select-none">
            رقم الهاتف
          </h2>
          <div className="mt-4 || mx-4">
            <input
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
              value={number}
              onChange={(e) => {
                if (!isNaN(e.target.value)) {
                  setNumber(e.target.value);
                }
              }}
              className={`${
                active ? " text-[#ca7801]" : " text-black"
              } bg-[#f5f5f5]  ||  || w-full || py-3 || text-[14px]  || outline-none  || px-3`}
              type="text"
              placeholder="رقم الهاتف الخاص بك"
            />
          </div>
          <button
            onClick={() => {
              if (number.length < 11) {
                toast.error("رقم الهاتف اقل من 11 رقم");
              } else if (number.length > 11) {
                toast.error("رقم الهاتف أكبر من 11 رقم");
              } else {
                sendToDrivery();
              }
            }}
            className="bg-mainColor hover:bg-[#d38e2a] || duration-500 || text-white || py-2 || rounded-full || mt-3 || text-sm || select-none || w-full"
          >
            أكمال
          </button>
        </div>
      </div>
      <div className="flex || items-center || justify-between || py-4 || top-0 || sticky || bg-white z-10">
        <div
          className="w-[30px] || h-[30px] || text-2xl || flex || items-center || cursor-pointer"
          onClick={() => router.back()}
        >
          <BsArrowRight />
        </div>
        <div className="">مراجعه الطلب</div>
        <div className="w-[30px] || h-[30px]"></div>
      </div>
      <main className="flex-1">
        {data.length !== 0 ? (
          data.map((ele) => (
            <div className="relative || pb-6" key={ele.id}>
              <Link
                href={`products/${ele.id}`}
                className="flex || gap-2 || items-center"
              >
                <div className="w-full || py-[20px]">
                  <p className="text-[18px] || mb-2">{ele.name}</p>
                  <p className="text-[14px]"> {ele.price * ele.num}ج.م</p>
                </div>
                <div className="relative || min-w-[100px] || h-[100px]">
                  <Image
                    src={ele.img}
                    fill
                    sizes="100% ,100%"
                    alt="sayed"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              </Link>
              <div className="mt-2 absolute || bottom-[10px]">
                <HomeBtn product={ele} />
              </div>
            </div>
          ))
        ) : (
          <div className="">لا يوجد طلبات حاليا</div>
        )}
      </main>
      <div className="py-2 || border-t || border-[#e0e0e0] || bg-white || sticky || bottom-0">
        <div className="flex || items-center || justify-between || py-2">
          <span>مجموع</span>
          <span>{totalNum}ج.م</span>
        </div>
        <Link
          href="/cart"
          className="py-2 || border-t || border-[#e0e0e0] || flex justify-center items-center || px-4 || w-full"
        >
          <button
            onClick={() => setNumberOpen(!numberOpen)}
            className="bg-mainColor hover:bg-[#d38e2a] || flex || items-center || justify-center || my-2 || gap-2 || px-5 || duration-500 || text-white || py-2 || rounded-full || text-sm || select-none || w-full"
          >
            اتمام الطلب
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Cart;
