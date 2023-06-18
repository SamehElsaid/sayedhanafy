import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiMenu } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { TbShoppingBag } from "react-icons/tb";

function TopHeader() {
  return (
    <>
      <div className="container  || max-w-5xl || hidden || justify-between || items-center || lg:flex">
        <div className="relative || w-[180px] || h-[52px]">
          <Image
            fill
            sizes="100%, 100%"
            src="/assets/img/Tecno.png"
            alt="Logo"
          />
        </div>
        <div className="py-[40px]">
          <ul className="flex || items-center || gap-5">
            <li className="font-semibold || text-[#24313d]">
              <Link href="/">Login</Link>
            </li>
            <li className="font-semibold || text-[#24313d]">
              <Link href="/">Home</Link>
            </li>
            <li className="font-semibold || text-[#24313d]">
              <Link href="/">Contact Us</Link>
            </li>
          </ul>
        </div>
        <div className="flex || items-center || gap-3">
          <div className="w-[40px] || h-[40px] || relative">
            <Image
              src="/assets/img/download.png"
              alt="call us"
              fill
              sizes="100%, 100%"

              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="text-sm">
            <p>
              <span className="font-bold">Call Us:</span>
              <span className="text-maincolor || font-[200]">
                {" "}
                (+20)01559902341
              </span>
            </p>
            <p className="font-[200]">Tecno@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="container || max-w-5xl">
        <div className="flex || justify-between || items-center ||  lg:hidden">
          <div className="text-2xl">
            <BiMenu />
          </div>
          <div className="relative || w-[180px] || h-[52px]">
            <Image
              fill
              sizes="100%, 100%"
              src="/assets/img/Tecno.png"
              alt="Logo"
            />
          </div>
          <div className="text-2xl || flex || gap-2 || items-center || py-[40px] ">
            <FaUserCircle />
            <TbShoppingBag />
          </div>
        </div>
      </div>
    </>
  );
}

export default TopHeader;
