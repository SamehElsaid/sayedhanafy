"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function SlideShow({ repo }) {
  const slideMade = useRef(null);
  const counter = useRef(null);
  const [length,setLength]=useState(0)
  useEffect(()=>{
    counter.current.classList.add("active");
  },[])
  useEffect(() => {
    const slideenmation = setInterval(() => {
      counter.current.classList.remove("active");
      setTimeout(() => {
        counter.current.classList.add("active");
      }, 100);
      if (length === slideMade.current.querySelectorAll(".slideMade").length -1) {
        slideMade.current.querySelectorAll(".slideMade").forEach((slide) => {
          slide.classList.remove("showSlide");
          slideMade.current
            .querySelectorAll(".slideMade")[0]
            .classList.add("showSlide");
        });
        setLength(0)
      } else {
        slideMade.current.querySelectorAll(".slideMade").forEach((slide) => {
          slide.classList.remove("showSlide");
          slideMade.current
            .querySelectorAll(".slideMade")
            [length+1].classList.add("showSlide");
        });
        setLength(length+1)
      }
    }, 5000);
    return () => {
      clearInterval(slideenmation);
    };
  }, [length]);
  const getLength = (i)=>{
    counter.current.classList.remove("active");
    setTimeout(() => {
      counter.current.classList.add("active");
    }, 100);
    slideMade.current.querySelectorAll(".slideMade").forEach((slide) => {
        slide.classList.remove("showSlide");
        slideMade.current
          .querySelectorAll(".slideMade")[i]
          .classList.add("showSlide");
      });
    setLength(i)
  }
  return (
    <div className=" bg-[#f5f5f5]">
      <div className="h-[4px]">
        <div ref={counter} className="bg-[#babcc0] || h-full || counter"></div>
      </div>
      <div
        ref={slideMade}
        className="h-[350px] || relative || container || max-w-5xl"
      >
        <div className="absolute || bottom-[10px] || z-10 || left-1/2 || -translate-x-1/2 || flex || gap-2 || items-center">
          {repo.map((slide ,i) => (
            <div onClick={()=>{getLength(i)}} key={slide.id} className={`${i === length ? "bg-[#0090f0]  || scale-150" : `bg-[#babcc0] `} transtionNew ||  w-[10px] || h-[10px] || rounded-full || cursor-pointer`}>
            </div>
          ))}
        </div>
        {repo.map((slide) => (
          <div
            key={slide.id}
            className={`${
              slide.id === 1 && "showSlide"
            } unshowSlide || slideMade || h-full || absolute || inset-0 || flex || items-center`}
          >
            <div className="relative || w-full">
              <div className="relative || z-10">
                <p className="text-xs">{slide.head}</p>
                <h2 className="text-3xl || mt-3 || font-semibold">
                  {slide.product}
                </h2>
                <h2 className="text-3xl || font-semibold">{slide.product2}</h2>
                <p className="my-[30px] || text-xs">{slide.details}</p>
                <button className="bg-[#0090f0] || rounded-full || uppercase || px-3 || py-2 || text-[10px]  || text-white">
                  Shop Now
                </button>
              </div>
              <Image
                fill
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                src={slide.img}
                alt="Logo"
                sizes="100%, 100%"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SlideShow;
