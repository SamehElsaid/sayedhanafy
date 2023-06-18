"use client";
import React, { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { TbShoppingBag } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
function Header() {
  const [fixed, setfixed] = useState(false);
  const [scrollBar, setScrollBar] = useState(0);
  const fixedHeader = () => {
    const winScroll = document.documentElement.scrollTop;
    const hight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / hight) * 100;
    setScrollBar(scrolled);

    if (window.scrollY >= 200) {
      setfixed(true);
    } else {
      setfixed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", fixedHeader);
  }, [fixed]);
  return (
    <div className={`${fixed && `fixed || top-0 || w-full || z-20 || bg`}`}>
      <div className={`${fixed ? `headerFideIn` : "opacityAnimation"} bg-maincolor || text-white || hidden || lg:block`}>
        <div className="container || max-w-5xl || flex || justify-between || gap-10">
          <div className="bg-[#0483d7] || flex || items-center || gap-2 || px-6 || cursor-pointer || font-semibold || w-[25%]">
            <div className="text-2xl">
              <BiMenu />
            </div>
            <p>All Categories</p>
            <div className="ml-3">
              <MdOutlineKeyboardArrowDown />
            </div>
          </div>
          <div className="w-[50%] py-2">
            <div className="flex || justify-between || items-center || bg-white || rounded-full || text-black || w-full || h-full || overflow-hidden">
              <input
                type="text"
                placeholder="Enter your search key"
                className="bg-transparent  || outline-none || px-3 || py-3 || w-[50%] || text-xs || font-semibold || text-[#253237]"
              />
              <div className="flex || items-center || justify-end || h-full w-[50%]">
                <div className="flex items-center">
                  <p className="w-fit || text-sm">All Categories</p>
                  <div className="mx-2">
                    <MdOutlineKeyboardArrowDown />
                  </div>
                </div>
                <div className="px-6 || flex || items-center || justify-center || h-full || bg-[#253237] || text-white || text-xl">
                  <FiSearch />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 || w-[25%] || flex || justify-end || items-center">
            <div className="relative">
              <TbShoppingBag className="text-4xl" />
              <p className="absolute || bottom-[-5px] || right-[-5px] || bg-white || text-[#253237] || w-[20px] || h-[20px] || flex || justify-center || items-center || font-bold || rounded-full ">
                0
              </p>
            </div>
            <p className="|| font-bold  || text-lg || ml-3">$0.00</p>
          </div>
        </div>
        <div
          style={{ transform: `translateX(-${100 - scrollBar}%)` }}
          className="h-[4px] || bg-[#babcc0]  transition-transform "
        ></div>
      </div>
      <div className={`${fixed ? `bg-[#253237] || headerFideIn` : "opacityAnimation"} lg:hidden ||  ||  block`}>
        <div className="flex || gap-3 container  || max-w-5xl justify-between ">
          <div className="bg-[#253237] || text-white  || flex || items-center || gap-2 || px-2 || cursor-pointer || font-semibold || w-fit">
            <div className="text-2xl">
              <BiMenu />
            </div>
            <p className="whitespace-nowrap">All Categories</p>
            <div className="ml-3">
              <MdOutlineKeyboardArrowDown />
            </div>
          </div>
          <div className=" flex || gap-3 || justify-between  || bg-white || rounded-full || border-2 || border-[#253237] || text-[#253237]  || w-fit  || md:w-full || h-full || overflow-hidden">
            <input
              type="text"
              placeholder="Enter your search key"
              className="bg-transparent hidden md:block || h-full || outline-none || px-3 || py-3 || w-[100%] || text-xs || font-semibold || text-[#253237]"
            />
            <div className="flex || justify-end ">
              <div className=" || items-center hidden md:flex">
                <p className="w-fit || text-sm || whitespace-nowrap">
                  All Categories
                </p>
                <div className="mx-2">
                  <MdOutlineKeyboardArrowDown />
                </div>
              </div>
              <div className="px-6  py-3  || md:py-0 || flex || items-center  || justify-center  || bg-[#253237] || text-white || text-xl">
                <FiSearch />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="fixed md:hidden || inset-0 || bg-white/80 || flex || justify-center || items-center || z-20 || px-[20px]">
        <div className="">
          <div className="absolute || top-[0] || right-[0] || text-3xl || p-[20px] || cursor-pointer">
            <IoMdClose className=" text-red-700"/>
          </div>
          <div className=" flex || gap-3 || justify-between  || bg-white || rounded-full || border-2 || border-[#253237] || text-[#253237] || w-full || h-full || overflow-hidden">
            <input
              type="text"
              placeholder="Enter your search key"
              className="bg-transparent  || h-full || outline-none || px-3 || py-3 || w-[100%] || text-xs || font-semibold || text-[#253237]"
            />
            <div className="flex || justify-end ">
              <div className="flex || items-center">
                <p className="w-fit || text-sm || whitespace-nowrap">
                  All Categories
                </p>
                <div className="mx-2">
                  <MdOutlineKeyboardArrowDown />
                </div>
              </div>
              <div className="px-6 || flex || items-center  || justify-center  || bg-[#253237] || text-white || text-xl">
                <FiSearch />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="block || lg:hidden">
        <div
          style={{ transform: `translateX(-${100 - scrollBar}%)` }}
          className={`${fixed ? `opacityAnimation` : ""} h-[3px] || bg-[#0090f0] transition-transform`}
        ></div>
      </div>
    </div>
  );
}

export default Header;
