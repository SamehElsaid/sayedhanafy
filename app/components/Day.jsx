"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DayProduct from "./DayProduct";
import { useRouter } from "next/navigation";

function Day({ day }) {
  const [date, setDate] = useState(false);
  const [pro, setPro] = useState(false);
  const [num, setNum] = useState(1);
  const router = useRouter()
  useEffect(() => {
    setDate(day.replaceAll("t", "/"));
    axios.get(`${process.env.API_URL}/drivery`).then((pro) => {
      const filterProduct = pro.data.filter(
        (ele) => ele.date === day.replaceAll("t", "/")
      );
      setPro(filterProduct);
      if(filterProduct.length === 0){
        router.push("/admin/dashboard/drivery")
      }
    });
  }, [num]);
  return (
    <div className="h-screen || flex || w-full || items-center || justify-center || relative || px-4 || ">
      <h2 className=" text-[#181a1b] || text-3xl || font-semibold || flex || items-center || justify-between || absolute || left-1/2 || -translate-x-1/2  || px-4|| top-0  || w-full ">
        <span className="ml-4">{date && date}</span>
      </h2>
      <div className="w-full">
        {pro.length === 0 ?
       <h2>No Data</h2> 
      :
        <div className="w-full">
          <div className="flex || bg-gray-200 text-left px-4 py-2 ">
            <h2 className="w-[10%] || min-w-[10%]">Time</h2>
            <h2 className="w-[20%] || min-w-[20%]">Number</h2>
            <h2 className="w-[40%] || min-w-[40%] || px-2">Location</h2>
            <h2 className="w-[10%] || min-w-[10%]">Total</h2>
            <h2 className="w-[10%] || min-w-[10%] || text-center">Drive</h2>
            <h2 className="w-[10%] || min-w-[10%] || text-center">Details</h2>
          </div>
        </div>
      
      }
        <div className=" max-h-[50vh] || overflow-y-auto">
          {pro &&
            pro.map((ele, i) => (
              <DayProduct
                key={i}
                day={day}
                ele={ele}
                num={num}
                setNum={setNum}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Day;
