"use client";
import React, { useState } from "react";
import lodash from "lodash";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper/core";
import { TbShoppingBag } from "react-icons/tb";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import "swiper/swiper.min.css";
import Image from "next/image";
import { Rate } from "antd";
SwiperCore.use([Navigation]);
function SwiperProducts({ products }) {
  const [rating, setRating] = useState(4.5);
  const handleRating = (rate) => {
    setRating(rate);
  };
  return (
    <div className="container">
      <div className="py-10">
        <div className="flex || justify-between || items-end || pb-4 || mb-8 || border-b || border-[#e3e3e3] || relative">
          <div className="absolute || h-[2px] || w-24 || bottom-[-1px] || left-0 || bg-[#0090f0]"></div>
          <div className="">
            <h2 className="text-2xl || font-semibold || mb-[10px] || leading-none">Featured Products</h2>
            <p className="text-sm || text-[#888888]">Add featured products to weekly line up</p>
          </div>
          <div className="flex || gap-3">
            <button className=" w-[30px] || hover:bg-[#0090f0] || cursor-pointer || hover:text-white || duration-500 || border || border-[#e3e3e3] || text-xl || text-[#888] || h-[30px] || rounded-full || flex || items-center || justify-center || custom-navigation-button-prev">
              <MdOutlineKeyboardArrowLeft />
            </button>
            <button className=" w-[30px] || hover:bg-[#0090f0] || cursor-pointer || hover:text-white || duration-500 || border || border-[#e3e3e3] || text-xl || text-[#888] || h-[30px] || rounded-full || flex || items-center || justify-center || custom-navigation-button-next">
              <MdOutlineKeyboardArrowRight />
            </button>
          </div>
        </div>
        <Swiper
          spaceBetween={50}
          slidesPerView={4}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
          nested={true}
          // keyboard={{
          //   enabled: true,
          //   onlyInViewport: true,
          //   pageUpDown: true,
          // }}
          // navigation
          navigation={{
            prevEl: ".custom-navigation-button-prev",
            nextEl: ".custom-navigation-button-next",
          }}
          // scrollbar={true}
        >
          {lodash.chunk(products, 2).map((twoProduct, i) => (
            <SwiperSlide key={i}>
              <div className="|| flex || flex-col || gap-10">
                {twoProduct.map((product) => (
                  <div
                    className=" px-3 || text-center  || cursor-pointer || productGroup"
                    key={product.id}
                  >
                    <div className="relative || w-[198px] || h-[198px]  || mx-auto">
                      {product.offer.state === "new" && (
                        <p className="absolute || top-0 || left-0 || z-10 || bg-maincolor || text-[12px] || font-semibold || px-2 || py-1 || text-white || rounded-full">
                          New
                        </p>
                      )}
                      {product.offer.state === "discount" && (
                        <p className="absolute || top-0 || left-0 || z-10 || bg-[#c81d1d] || text-[12px] || font-semibold || px-3 || py-1 || text-white || rounded-full">
                          -{product.offer.percentage}%
                        </p>
                      )}
                      <Image
                        src={product.img[0].img}
                        alt={product.title}
                        fill
                        sizes="100%, 100%"
                        quality={100}
                        style={{ objectFit: "contain" }}
                      />

                      <Image
                        src={product.img[1].img}
                        alt="Feathers_2"
                        fill
                        sizes="100%, 100%"
                        quality={100}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    <div className="relative || mt-5 || group">
                      <h2 className="overLap group-hover:text-[#0090f0] || duration-500">
                        {product.title}
                      </h2>
                      <h2 className="absolute || opacity-0 || invisible || group-hover:opacity-100 || group-hover:visible || bottom-[calc(100%+10px)] || rounded-sm || bg-[#253237] || text-white || text-xs || z-10 || px-0.5 || py-0.5 || duration-500">
                        {product.title}
                      </h2>
                      <div className="arrow-down || opacity-0 || invisible || group-hover:opacity-100 || group-hover:visible || absolute || top-[-11px] || left-1 || duration-500"></div>
                    </div>
                    <div className="flex || justify-center || items-center">
                      <Rate
                        className="custom-rating"
                        allowHalf
                        disabled
                        value={4.5}
                        style={{
                          color: "#fdd835",
                          fontSize: "16px",
                          cursor: "pointer",
                        }}
                        onChange={handleRating}
                      />
                    </div>
                    <div className="relative || addCartGroup">
                      <p className="text-sm text-[#a9a8a8] || font-semibold || price">
                        {product.offer.state === "discount" ? (
                          <>
                            <span className="line-through || mr-3">
                              ${product.price}
                            </span>
                            <span className="text-[#c81d1d]">
                              {product.price -
                                product.price *
                                  (product.offer.percentage / 100)}
                              $
                            </span>
                          </>
                        ) : (
                          <span>${product.price}</span>
                        )}
                      </p>
                      <div className="uppercase  || text-[12px] || absolute || top-1/2 || -translate-y-1/2 || left-1/2 || -translate-x-1/2">
                        <p className="addCart || flex || items-center || gap-1">
                          <span className="whitespace-nowrap">
                            add to cart{" "}
                          </span>{" "}
                          <TbShoppingBag className="text-[16px]" />
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default SwiperProducts;
