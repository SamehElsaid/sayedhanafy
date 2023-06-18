import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

function MenuProductTable({ ele, num, setNum }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    setName(ele.name);
    setPrice(ele.price);
  }, [ele]);
  return (
    <tr className="border-b || border-[#e0e0e0]" key={ele.id}>
      <td>
        <div className="relative min-w-[100px] h-[100px] border-r || border-[#e0e0e0]">
          <Image
            src={ele.img}
            fill
            sizes="100%, 100%"
            alt="sayed"
            style={{ objectFit: "contain" }}
          />
        </div>
      </td>
      <td className="border-r  || min-w-[100px]  || max-w-[150px] || px-3 || border-[#e0e0e0]">
        {edit ? (
          <input
            type="text"
            placeholder="New name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" bg-[#f5f5f5] || w-full || py-1.5 || text-[14px] || outline-none  || px-3"
          />
        ) : (
          <>
            <p className="text-[18px] mb-2">{ele.name}</p>
            {ele.description && (
              <p className="text-[#6a3f01a6] text-[14px]">{ele.description}</p>
            )}
          </>
        )}
      </td>
      <td className="border-r  || min-w-[100px]  || max-w-[150px] || text-center || px-2 || border-[#e0e0e0]">
        {edit ? (
          <input
            type="text"
            placeholder="New name"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className=" bg-[#f5f5f5] || w-full || py-1.5 || text-[14px] || outline-none  || px-3"
          />
        ) : (
          <p className="text-[14px]  ||  mb-2">{ele.price}ج.م</p>
        )}
      </td>
      <td className="border-r || text-center  || px-2 || border-[#e0e0e0]">
        <div className="flex || items-center || justify-center">
          {edit ? (
            <AiOutlineCheck
              className="text-green-700  || cursor-pointer || text-xl"
              onClick={() =>
                axios
                  .patch(`${process.env.API_URL}/products/${ele.id}`, {
                    name,
                    price,
                  })
                  .then((res) => {
                    setNum(num + 1);
                    setEdit(false)
                  })
              }
            />
          ) : (
            <BiEdit
              className="text-mainColor  || cursor-pointer || text-xl"
              onClick={() => setEdit(!edit)}
            />
          )}
        </div>
      </td>
      <td className="border-r || text-center || px-2 || border-[#e0e0e0]">
        <div
          className="flex || items-center || justify-center"
          onClick={() => {
            axios
              .delete(`${process.env.API_URL}/products/${ele.id}`)
              .then((res) => {
                setNum(num + 1);
              });
          }}
        >
          <AiOutlineDelete className="text-red-500  || cursor-pointer || text-xl" />
        </div>
      </td>
    </tr>
  );
}

export default MenuProductTable;
