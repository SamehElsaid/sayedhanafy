import ProductDetails from "@/app/components/ProductDetails";
import axios from "axios";
import Image from "next/image";
import React from "react";
async function fetchdProducts(products) {
  try {
    const res = await axios.get(`${process.env.API_URL}/products/${products}`);
    const data = res.data;
    return data;
  } catch {
    return false;
  }
}
async function page({ params: { products } }) {
  const product = await fetchdProducts(products);
  return (
    <ProductDetails product={product}/>
  );
}

export default page;
