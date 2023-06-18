import axios from "axios";
export const getCart = async () => {
  const idCart = localStorage.getItem("idCart");
  try {
    const res = await axios.get(`${process.env.API_URL}/cart/${idCart}`);
    const data = res.data;
    return data;
  } catch {
    return [];
  }
};
export const addToCart = async (product, num, check, comment) => {
  const idCart = localStorage.getItem("idCart");
  const repo = await axios
    .get(`${process.env.API_URL}/cart/${idCart}`)
    .then((res) => {
      const findProduct = res.data.products.find(
        (ele) => ele.id === product.id
      );
      if (findProduct) {
        findProduct.num = findProduct.num + num;
        findProduct.comment = comment ? comment : "";
        axios.patch(`${process.env.API_URL}/cart/${idCart}`, {
          products: [...res.data.products],
          number: res.data.number + num,
        });
      } else {
        axios.patch(`${process.env.API_URL}/cart/${idCart}`, {
          products: [
            ...res.data.products,
            { ...product, comment: comment ? comment : "" },
          ],
          number: res.data.number + num,
          comment: comment ? comment : "",
        });
      }
    });
  return repo;
};
export const minCart = async (product, num) => {
  const idCart = localStorage.getItem("idCart");
  const repo = await axios
    .get(`${process.env.API_URL}/cart/${idCart}`)
    .then((res) => {
      const findProduct = res.data.products.find(
        (ele) => ele.id === product.id
      );
      if (findProduct.num !== 1) {
        findProduct.num = findProduct.num - num;
        axios.patch(`${process.env.API_URL}/cart/${idCart}`, {
          products: [...res.data.products],
          number: res.data.number - num,
        });
      } else {
        const filter = res.data.products.filter((ele) => ele.id !== product.id);
        if (filter.length === 0) {
          axios.patch(`${process.env.API_URL}/cart/${idCart}`, {
            products: [],
            number: 0,
          });
        } else {
          axios.patch(`${process.env.API_URL}/cart/${idCart}`, {
            products: [...filter],
            number: res.data.number - num,
          });
        }
      }
      // if (findProduct) {
      //   findProduct.num = findProduct.num + num;
      //   axios.patch(`${process.env.API_URL}/cart/${idCart}`, {
      //     products: [...res.data.products],
      //     number: res.data.number + num,
      //   });
      // } else {
      //   axios.patch(`${process.env.API_URL}/cart/${idCart}`, {
      //     products: [...res.data.products, product],
      //     number: res.data.number + num,
      //   });
      // }
    });
  return repo;
};
