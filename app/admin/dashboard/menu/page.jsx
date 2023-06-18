import Menu from "@/app/components/Menu";
import axios from "axios";
async function fetchHeader() {
  try {
    const res = await axios.get(`${process.env.API_URL}/header`);
    const data = res.data;
    return data;
  } catch {
    return [];
  }
}
async function page() {
  const menuHeader= await fetchHeader()
  return (
    <Menu menuHeader={menuHeader}/>
  );
}

export default page;
