import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface ResponseType {
  success: boolean;
  message: string;
  data: Product;
}

const getProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`${URL}/${id}`);
  const json: ResponseType = await res.json();
  return json?.data;
}

export default getProduct;