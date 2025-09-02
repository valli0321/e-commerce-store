import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

interface ResponseType {
    success: boolean;
    message: string;
    data: Size[];
}

const getSizes = async (): Promise<Size[]> => {
    try {
        const res = await fetch(URL);
        const json: ResponseType = await res.json();
        return json?.data;
    } catch (error) {
        console.error('Error fetching sizes:', error);
        // fallback response
        return [];
    }
}

export default getSizes;