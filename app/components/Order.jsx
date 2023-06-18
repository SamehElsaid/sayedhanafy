"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";

function Order() {
  const [days, setDays] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.API_URL}/order`).then((res) => {
      const checkArray = [];
      const ProArray = [];
      res.data.forEach((ele) => {
        if (!checkArray.includes(ele.date)) {
          checkArray.push(ele.date);
          ProArray.push(ele);
        }
      });
      setDays(ProArray);
    });
  }, []);
  return (
    <div className="h-screen || flex || w-full || items-center || justify-center || relative || px-4">
      <h2 className=" text-[#181a1b] || text-3xl || font-semibold || flex || items-center || justify-between || absolute || left-1/2 || -translate-x-1/2  || px-4|| top-0  || w-full ">
        <span className="ml-4">Order</span>
      </h2>
      {days.length === 0 ? 
      <h2>No Data</h2>
      :
      
      <div className="w-full">
        <table className="w-full border || border-[#e0e0e0]">
          <thead>
            <tr>
              <th className="bg-gray-200 text-left px-4 py-2 w-full">Name</th>
              <th className="bg-gray-200 text-left px-4 py-2 w-[100px]">
                Show
              </th>
            </tr>
          </thead>
          <tbody>
            {days.length !== 0 &&
              days.map((sec) => (
                <tr className="border-b border-[#e0e0e0]" key={sec.id}>
                  <td className="px-4 py-2 || border-r || border-[#e0e0e0]">
                   {sec.date}
                  </td>
                  <td className="px-4 || flex || items-center || justify-center || h-full || py-2">
                    <Link href={`/admin/dashboard/order/${sec.date.replaceAll("/","t")}`}>
                      <BiEdit className="text-mainColor || cursor-pointer || text-xl" />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      }
    </div>
  );
}

export default Order;
