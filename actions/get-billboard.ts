import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

interface ResponseType {
  success: boolean;
  message: string;
  data: Billboard;
}

const getBillboard = async (id: string): Promise<Billboard> => {
  const res = await fetch(`${URL}/${id}`);
  const json: ResponseType = await res.json();
  return json?.data;
}

export default getBillboard;