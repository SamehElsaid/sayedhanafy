"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { RiCoupon2Line } from "react-icons/ri";
import { CiLocationOn, CiTimer } from "react-icons/ci";
import { IoIosArrowBack, IoMdMenu } from "react-icons/io";
import HomeBtn from "./HomeBtn";
import { useSelector } from "react-redux";

function HomePage({ header, products }) {
  const containerRef = useRef(null);
  const [divId, setDivId] = useState("");
  const [acceptLocation, setAcceptLocation] = useState(false);
  const [sortedHeader, setShortHead] = useState([...header]);
  const [totalNum, setTotalNum] = useState(0);
  const [num, setNum] = useState(0);
  const cart = useSelector((redux) => redux.cart);
  useEffect(() => {
    if (cart.data.products && cart.data.products.length !== 0) {
      let total = 0;
      cart.data.products.forEach((pro) => {
        total += pro.price * pro.num;
      });
      setTotalNum(total);
      setNum(cart.data.number);
    }
  }, [cart, cart.refresh]);
  useEffect(() => {
    if (divId !== "") {
      const find = sortedHeader.find((e) => e.en === divId);
      const index = sortedHeader.findIndex((head) => head.en === divId);
      const slicedBefore = sortedHeader.slice(0, index);
      const slicedAfter = sortedHeader.slice(index + 1);
      setShortHead([find, ...slicedAfter, ...slicedBefore]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divId]);
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const { scrollTop, scrollHeight, clientHeight } = container;
      const divs = container.querySelectorAll(".head");

      divs.forEach((div) => {
        const { offsetTop, offsetHeight, id } = div;
        const divTop = offsetTop - scrollTop;
        const divBottom = divTop + offsetHeight;
        const isInView =
          (divTop >= 0 && divTop <= clientHeight * 0.6) ||
          (divBottom >= 0 && divBottom <= clientHeight * 0.6);

        if (isInView) {
          setDivId(id);
        }
      });
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("userLocation")) &&
      JSON.parse(localStorage.getItem("userLocation"))[2].components.city ===
        "Tanta"
    ) {
      setAcceptLocation(true);
    } else {
      setAcceptLocation(false);
    }
  }, []);
  const handleClick = (id) => {
    const targetDiv = document.getElementById(id);
    if (targetDiv) {
      const container = containerRef.current;
      const targetTop = targetDiv.offsetTop;
      container.scrollTo({
        top: Math.max(0, targetTop - 100),
        behavior: "smooth",
      });
    }
  };
  return (
    <>
      <div
        ref={containerRef}
        className={` overflow-y-scroll || scrollStyle || min-h-[300px] || h-screen || relative`}
      >
        <h2 className="border-b-[3px] || border-[#cb7901] || h-[50px] || flex || items-center || justify-between || mx-4 ">
          <span className="opacity-0 || invisible || text-2xl">
            <IoMdMenu />
          </span>

          <span>توصيل</span>
          <span className="opacity-0 || invisible || text-2xl">
            <IoMdMenu />
          </span>
        </h2>
        {acceptLocation && (
          <>
            <div className="mx-4 || flex || items-center || justify-between || gap-4  || border-b || border-[#e0e0e0] || py-[12px]">
              <div className="text-xl || text-mainColor">
                <CiLocationOn />
              </div>
              <div className="flex-1">
                <p className="text-[12px] || text-[#767676] || mb-0.5">
                  توصيل الي
                </p>
                <h2 className="text-[14px]">
                  {JSON.parse(
                    localStorage.getItem("userLocation")
                  )[2].formatted.replaceAll("unnamed road,", "")}
                </h2>
              </div>
              <div className="text-xl || text-mainColor">
                <IoIosArrowBack />
              </div>
            </div>
            <div className="mx-4 || flex || items-center || justify-between || gap-4  || border-b || border-[#e0e0e0] || py-[12px]">
              <div className="text-xl || text-mainColor">
                <CiTimer />
              </div>
              <div className="flex-1">
                <p className="text-[12px] || text-[#767676] || mb-0.5">
                  يوصل خلال
                </p>
                <h2 className="text-[14px]">25 دقيقه</h2>
              </div>
              <div className="text-xl || text-mainColor">
                <IoIosArrowBack />
              </div>
            </div>
          </>
        )}
        <h2></h2>
        <div className="border || border-[#e0e0e0] || p-[16px] || mt-[16px] || text-sm || mx-4">
          <div className="flex || items-center || justify-between">
            <h2 className="font-semibold">خصم ٢٥%</h2>
            <p className="text-xl">
              <RiCoupon2Line />
            </p>
          </div>
          <h2>إحصل على خصم 25٪ الان!</h2>
          <h2>توصيل فقط •</h2>
          <h2>يطبق على أي طلب أعلى من 100 ج.م</h2>
          <div className="">
            <div className="px-5 || inline-block || py-2 || border || border-[#e0e0e0] || rounded-full || font-bold || text-[#1f1f1f59] || mt-3 || select-none">
              توصيل فقط
            </div>
          </div>
        </div>
        <header className="flex || scrollStyle || overflow-x-auto || gap-2 || items-center || justify-between || box-shadow-edit || py-3 || mx-4 || sticky || top-0 || z-10 || bg-white">
          {sortedHeader.map((head, i) => (
            <div
              onClick={() => handleClick(head.en)}
              className={`
            
            ${
              divId !== ""
                ? divId === head.en
                  ? "bg-mainColor || text-white"
                  : "bg-mainText"
                : ""
            }
            ${divId === "" && i === 0 ? `bg-mainColor || text-white` : ``} 
            px-3 || header || min-w-fit || whitespace-nowrap || py-2  || text-sm || rounded-full || cursor-pointer`}
              key={head.id}
            >
              {head.ar}.
            </div>
          ))}
        </header>
        <main className="mx-4">
          {header.map((head) => (
            <div id={head.en} className="head" key={head.id}>
              <h2 className="text-[#382201] || mt-8 || mb-4 || text-[32px]">
                {head.ar}.
              </h2>
              {products
                .filter((product) => product.type.en === head.en)
                .map((ele) => (
                  <div
                    className="pb-[35px] || relative  || border-b || border-[#e0e0e0]"
                    key={ele.id}
                  >
                    <Link
                      href={`products/${ele.id}`}
                      className="flex || gap-2 || items-center"
                    >
                      <div className="w-full || py-[20px]">
                        <p className="text-[18px] || mb-2">{ele.name}</p>
                        {ele.description && (
                          <p className="text-[#6a3f01a6] || text-[14px]">
                            {ele.description}
                          </p>
                        )}
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
                ))}
            </div>
          ))}
        </main>
        {acceptLocation && (
          <Link
            href="/cart"
            className="py-2 || border-t || border-[#e0e0e0] || flex justify-center items-center || px-4 || sticky || bottom-0 || w-full || bg-white"
          >
            <button className="bg-mainColor hover:bg-[#d38e2a] || flex || items-center || justify-between || my-2 || gap-2 || px-5 || duration-500 || text-white || py-2 || rounded-full || text-sm || select-none || w-full">
              <span className="w-[100px]">
                <span className="w-[30px] || rounded-full || h-[30px] || flex || justify-center  || items-center || bg-[#8c5200]">
                  {num}
                </span>
              </span>
              <span className="flex-1"> راجع الطلبات</span>
              <span className="w-[100px]">{totalNum} ج.م</span>
            </button>
          </Link>
        )}
      </div>
    </>
  );
}

export default HomePage;
