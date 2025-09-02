import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

interface ResponseType {
  success: boolean;
  message: string;
  data: Category;
}

const getCategory = async (id: string): Promise<Category> => {
  const res = await fetch(`${URL}/${id}`);
  const json: ResponseType = await res.json();
  return json?.data;
}

export default getCategory;