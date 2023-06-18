import axios from "axios";
import HomePage from "./components/HomePage";

async function fetchHeader() {
  try {
    const res = await axios.get(`${process.env.API_URL}/header`);
    const data = res.data;
    return data;
  } catch {
    return [];
  }
}
async function fetchdProducts() {
  try {
    const res = await axios.get(`${process.env.API_URL}/products`);
    const data = res.data;
    return data;
  } catch {
    return [];
  }
}
export default async function Home() {
  const header = await fetchHeader();
  const products = await fetchdProducts();
  return (
    <>
      <HomePage header={header} products={products}/>
    </>
  );
}
