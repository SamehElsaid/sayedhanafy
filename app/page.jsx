import axios from "axios";
import TopHeader from "./components/TopHeader";
import Header from "./components/Header";
import SlideShow from "./components/SlideShow";
import SwiperProducts from "./components/SwiperProducts";

export default async function Home() {
  const repo = await fetchData()
  const products = await fetchDataProducts()
  return (
    <main className="">
      <TopHeader/>
      <Header/>
      <SlideShow repo={repo}/>
      <SwiperProducts products={products}/>
    </main>
  );
}
async function fetchData() {
  try {
    const res = await axios.get("http://localhost:3009/header");
    const data = res.data;
    return data
  } catch {
    return [];
  }
}
async function fetchDataProducts() {
  try {
    const res = await axios.get("http://localhost:3009/products");
    const data = res.data;
    return data
  } catch {
    return [];
  }
}
