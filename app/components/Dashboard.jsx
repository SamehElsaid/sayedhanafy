"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

function Dashboard() {
  const [section, setSection] = useState([]);
  const [num, setNum] = useState(0);
  useEffect(() => {
    axios.get(`${process.env.API_URL}/header`).then((res) => {
      setSection(res.data);
    });
  }, [num]);
  const addSection = (e) => {
    e.preventDefault();
    const englishRegex = /^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]+$/;
    const arabicRegex = /^[\u0600-\u06FF\s]+$/;

    if (englishRegex.test(e.target.en.value)) {
      if (!arabicRegex.test(e.target.ar.value)) {
        toast.error(`Second Name Not in Ar`);
      } else {
        axios
          .post(`${process.env.API_URL}/header`, {
            en: e.target.en.value,
            ar: e.target.ar.value,
          })
          .then((_) => {
            setNum(num + 1);
            e.target.en.value = "";
            e.target.ar.value = "";
          });
      }
    } else {
      toast.error(`Frist Name Not in En`);
    }
  };
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
            {section.length !== 0 &&
              section.map((sec) => (
                <tr className="border-b border-[#e0e0e0]" key={sec.id}>
                  <td className="px-4 py-2 || border-r || border-[#e0e0e0]">
                    {sec.en} || {sec.ar}
                  </td>
                  <td className="px-4 || flex || items-center || justify-center || h-full || py-2">
                    <AiOutlineDelete
                      className="text-red-500 || cursor-pointer || text-xl"
                      onClick={() => {
                        axios
                          .delete(`${process.env.API_URL}/header/${sec.id}`)
                          .then((_) => {
                            setNum(num + 1);
                          });
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex || justify-center || items-center">
          <form
            onSubmit={addSection}
            className="w-[50%] || bg-white || flex || flex-col || gap-4 || p-5"
          >
            <input
              required
              name="en"
              type="text"
              placeholder="Name in en"
              className="py-2 || px-3 || | border || outline-none || border-[#e0e0e0]"
            />
            <input
              required
              name="ar"
              type="text"
              placeholder="الاسم بالعربي"
              className="py-2 || px-3 || rightDir || | border || outline-none || border-[#e0e0e0]"
            />
            <button
              type="submit"
              className="bg-[#5e90f9] || py-2 || font-semibold || text-white"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
