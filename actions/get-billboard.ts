import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

interface ResponseType {
    success: boolean;
    message: string;
    data: Billboard;
}

const getBillboard = async (id: string): Promise<ResponseType> => {
        const res = await fetch(`${URL}/${id}`);

        return await res.json();
}

export default getBillboard;