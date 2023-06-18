"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { addToCart } from "./cartAction";
import { useDispatch, useSelector } from "react-redux";
import { REFRESH } from "../redux/cartSlice/cartSlice";
import BtnNumber from "./BtnNumber";

function ProductDetails({ product }) {
  const [active, setActive] = useState(false);
  const [comment, setComment] = useState("");
  const router = useRouter();
  const [num, setNum] = useState(1);
  const [showDrive, setShowDrive] = useState(false);
  const popUp = useRef();
  const cart = useSelector((redux) => redux.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (popUp.current && !popUp.current.contains(e.target)) {
        setShowDrive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [popUp]);

  return (
    <div className="relative">
      <div
        className={`${
          showDrive
            ? "visible || opacity-100"
            : "invisible || opacity-0 || delay-500"
        } || overflow-hidden || transition-all || duration-500 absolute || inset-0 || bg-[#000000cc] || z-20 || flex || flex-col || justify-end`}
      >
        <div
          ref={popUp}
          className={`${
            showDrive ? "translate-y-[0%] delay-500 " : "translate-y-[100%]"
          } transition-transform || duration-500 bg-white || pb-10 || rounded-t-lg || rounded-tl-lg || px-3`}
        >
          <p className="w-[80px] || h-[4px] || bg-[#d9d9d9] || rounded-full || mt-2 || mb-3 || mx-auto"></p>
          <h2 className="font-semibold || pb-3 || border-b || border-[#e0e0e0] || select-none">
            استمتع بأفضل تجربة مع Orderfast
          </h2>
          <h2 className="border-b-[3px] || border-[#cb7901] || h-[50px] || flex || items-center || justify-center || mx-4 || select-none">
            توصيل
          </h2>
          <button
            onClick={() => {
              if (
                JSON.parse(localStorage.getItem("userLocation"))[2].components
                  .city === "Tanta"
              ) {
              } else {
                toast.error(` هذا العنوان خارج منطقة التوصيل`);
              }
            }}
            className="bg-mainColor hover:bg-[#d38e2a] || duration-500 || text-white || py-2 || rounded-full || mt-3 || text-sm || select-none || w-full"
          >
            تسليم الي موقعي الحالي
          </button>
          <Link
            href="/map"
            className="py-2 || block || text-center hover:bg-[#1f1f1f1f] || duration-500 || rounded-full || mt-3 || text-sm || select-none || w-full"
          >
            موقع اخر
          </Link>
        </div>
      </div>
      <div
        onClick={() => router.back()}
        className="absolute || top-[20px] || right-[20px] || text-2xl || cursor-pointer || z-20"
      >
        <BsArrowRight />
      </div>
      {product ? (
        <div className="h-screen || p-[20px] || flex || flex-col">
          <div className="w-full || relative || h-[50vh]">
            <Image
              src={product.img}
              fill
              sizes="100% ,100%"
              alt="sayed"
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="flex-1">
            <p className="text-[18px] || mb-2 || font-semibold">
              {product.name}
            </p>
            <p className="text-[14px] || mb-2 || py-3 || border-b || border-[#e0e0e0]">
              {product.price} ج.م
            </p>
            <p className="text-[14px] || mb-2 || font-semibold">تعليمات خاصة</p>
            <input
              onFocus={() => setActive(true)}
              onBlur={() => setActive(false)}
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
              className={`${
                active ? " text-[#ca7801]" : " text-black"
              } bg-[#f5f5f5] || w-full || py-1.5 || text-[14px] || outline-none  || px-3`}
              type="text"
              placeholder="أضف تعليمات"
            />
          </div>
          <div className="flex || flex-col  || border-t || border-[#e0e0e0] || pt-4">
            <BtnNumber num={num} setNum={setNum}/>
            <button
              onClick={() => {
                if (JSON.parse(localStorage.getItem("userLocation"))) {
                  if (
                    JSON.parse(localStorage.getItem("userLocation"))[2]
                      .components.city === "Tanta"
                  ) {
                    addToCart({ ...product, num },num,false,comment).then(res=>{
                      dispatch(REFRESH(cart.refresh + 1))
                      router.push("/")
                    });
                  } else {
                    setShowDrive(!showDrive);
                  }
                } else {
                  toast.error(`برجاء فتح تحديد الموقع`);
                }
              }}
              className="bg-mainColor || text-white || py-2 || rounded-full || mt-3 || select-none"
            >
              أضف الي السلة
            </button>
          </div>
        </div>
      ) : (
        <div className="flex || items-center || justify-center || h-screen || font-semibold">
          هذا المنتج غير متوفر
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
