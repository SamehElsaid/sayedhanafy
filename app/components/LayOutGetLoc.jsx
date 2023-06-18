"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "./cartAction";
import { GET_CART } from "../redux/cartSlice/cartSlice";

function LayOutGetLoc({ children }) {
  const cart = useSelector((redux) => redux.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!localStorage.getItem("userLocation")) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetch(
              `https://api.opencagedata.com/geocode/v1/json?key=4efc6215dd6d4f6a9fb0a93d14ded2ee&q=${latitude},${longitude}`
            )
              .then((response) => response.json())
              .then((data) => {
                localStorage.setItem(
                  "userLocation",
                  JSON.stringify([latitude, longitude, data.results[0]])
                );
              })
              .catch((error) => {
                console.log(error);
              });
          },
          (error) => {
            console.log(error);
          }
        );
      } else {
        console.log("Geolocation is not supported by your browser.");
      }
    }
  }, []);
  useEffect(() => {
    if (!localStorage.getItem("idCart")) {
      axios.get(`${process.env.API_URL}/cart`).then((res) => {
        axios
          .post(`${process.env.API_URL}/cart`, {
            id: res.data.length + 1,
            products: [],
            number: 0,
          })
          .then((_) => {
            localStorage.setItem("idCart", JSON.stringify(res.data.length + 1));
          });
      });
    }
  });
  useEffect(() => {
    getCart().then((res) => {
      dispatch(GET_CART(res))
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart.refresh]);
  return (
    <div className="flex">
      <div className="w-[450px] || min-w-[450px]">{children}</div>
      <div className="w-full || relative || h-screen">
        <Image
          src="https://static.zyda.com/cdn-cgi/image/width=1200,f=auto,metadata=none/photos/restaurants/photo_urls/4830/original/WhatsApp_Image_2023-05-28_at_12.00.31_PM.jpeg?1685264645"
          fill
          sizes="100% ,100%"
          alt="sayed"
          style={{ objectFit: "cover" }}
        />
        <div className="absolute || w-[150px] || h-[150px] || rounded-full || top-1/2 || left-1/2 || -translate-x-1/2 || -translate-y-1/2 || overflow-hidden">
          <Image
            src="https://static.zyda.com/cdn-cgi/image/width=256,f=auto,metadata=none/photos/restaurants/logo_urls/4830/original/80390516_2962955900382554_7936731969642037248_n_%281%29.jpeg?1677531720"
            fill
            sizes="100% ,100%"
            alt="sayed"
          />
        </div>
      </div>
    </div>
  );
}

export default LayOutGetLoc;
