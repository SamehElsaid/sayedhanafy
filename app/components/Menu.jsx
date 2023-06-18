"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";

function Menu({ menuHeader }) {
  const router = useRouter();
  return (
    <div className="h-screen || flex || w-full || items-center || justify-center || relative || px-4">
      <h2 className=" text-[#181a1b] || text-3xl || font-semibold || flex || items-center || justify-between || absolute || left-1/2 || -translate-x-1/2  || px-4|| top-0  || w-full ">
        <span className="ml-4">Section</span>
      </h2>
      <div className="w-full">
        <table className="w-full border || border-[#e0e0e0]">
          <thead>
            <tr>
              <th className="bg-gray-200 text-left px-4 py-2 w-full">Name</th>
              <th className="bg-gray-200 text-left px-4 py-2 w-[100px]">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {menuHeader.map((sec) => (
              <tr className="border-b border-[#e0e0e0]" key={sec.id}>
                <td className="px-4 py-2 || border-r || border-[#e0e0e0]">
                  {sec.en} || {sec.ar}
                </td>
                <td className="px-4 || flex || items-center || justify-center || h-full || py-2">
                  <Link href={`/admin/dashboard/menu/${sec.id}`}>
                    <BiEdit className="text-mainColor || cursor-pointer || text-xl" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Menu;
