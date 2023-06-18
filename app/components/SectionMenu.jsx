"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import MenuProductTable from "./MenuProductTable";

function SectionMenu({ sectionMenu }) {
  const [activeProduct, setActiveProduct] = useState(false);
  const [activePrice, setActivePrice] = useState(false);
  const [products, setProducts] = useState(false);
  const [nameProduct, setNameProduct] = useState("");
  const [validationName, setValidationName] = useState(false);
  const [namePrice, setNamePrice] = useState("");
  const [num, setNum] = useState(1);
  const [sectionName, setSectionName] = useState({});
  useEffect(() => {
    axios.get(`${process.env.API_URL}/header/${sectionMenu}`).then((res) => {
      axios
        .get(`${process.env.API_URL}/products`)
        .then((pro) => {
          const data = res.data.en;
          const productsFilter = pro.data.filter((ele) => ele.type.en === data);
          setProducts(productsFilter);
        })
        .catch((err) => {
          setProducts(false);
        });
    });
    // setProducts(products);
  }, [num]);

  const imgDefault = `https://static.zyda.com/cdn-cgi/image/width=384,f=auto,metadata=none/images/542259/image_urls/default/7b0bce2f96bca46f55a631f50cc88da83cad6e4e.jpeg?1677583068`;
  useEffect(() => {
    let toastId = null;
    if (validationName) {
      toastId = toast.loading("لا يجب ان يحتوي علي ارقام فقط");
    } else {
      toast.dismiss(toastId);
    }
  }, [validationName]);
  useEffect(() => {
    axios.get(`${process.env.API_URL}/header/${sectionMenu}`).then((res) => {
      setSectionName(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addProudct = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.API_URL}/products`, {
        name: nameProduct,
        type: {
          en: sectionName.en,
          ar: sectionName.ar,
        },
        img: imgDefault,
        price: namePrice,
      })
      .then((res) => {
        setNum(num + 1);
        setNamePrice("");
        setNameProduct("");
      });
  };
  return (
    <div className="h-screen || flex || w-full || items-center || justify-center || relative || px-4 || ">
      <h2 className=" text-[#181a1b] || text-3xl || font-semibold || flex || items-center || justify-between || absolute || left-1/2 || -translate-x-1/2  || px-4|| top-0  || w-full ">
        <span className="px-4">
          {sectionName.en && `Menu/${sectionName.en}`}
        </span>
      </h2>
      <div className="w-full">
        {products && products.length !== 0 ? (
          <div className="">
            <table className="w-full border || border-[#e0e0e0]">
              <thead className="bg-gray-200 ">
                <tr className="">
                  <th className="py-3">Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {products.map((ele) => (
                  <MenuProductTable
                    key={ele.id}
                    num={num}
                    setNum={setNum}
                    ele={ele}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="">No Items Found</div>
        )}

        <div className="flex || justify-center || items-center">
          <form
            onSubmit={addProudct}
            className="w-[50%] || bg-white || flex || flex-col || gap-4 || p-5 rightDir"
          >
            <div className="flex || flex-col || gap-3 || py-2 || flex-1">
              <input
                type="text"
                placeholder="أسم المنتج"
                onFocus={() => setActiveProduct(true)}
                required
                onBlur={() => setActiveProduct(false)}
                onChange={(e) => {
                  const value = e.target.value;
                  setNameProduct(value);
                  if (value.length !== 0) {
                    if (isNaN(value)) {
                      setValidationName(false);
                    } else {
                      setValidationName(true);
                    }
                  } else {
                    setValidationName(false);
                  }
                }}
                value={nameProduct}
                className={`${
                  activeProduct ? " text-[#ca7801]" : " text-black"
                } bg-[#f5f5f5] || w-full || py-1.5 || text-[14px] || outline-none  || px-3`}
              />
              <input
                type="text"
                placeholder="سعر المنتج"
                onFocus={() => setActivePrice(true)}
                required
                onBlur={() => setActivePrice(false)}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) {
                    setNamePrice(value);
                  }
                }}
                value={namePrice}
                className={`${
                  activePrice ? " text-[#ca7801]" : " text-black"
                } bg-[#f5f5f5] || w-full || py-1.5 || text-[14px] || outline-none  || px-3`}
              />
              <button
                type="submit"
                className="bg-[#5e90f9] || py-2 || font-semibold || text-white"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SectionMenu;
