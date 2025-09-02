import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

interface ResponseType {
    success: boolean;
    message: string;
    data: Color[];
}

const getColors = async (): Promise<Color[]> => {
    try {
        const res = await fetch(URL);
        const json: ResponseType = await res.json();
        return json?.data;
    } catch (error) {
        console.error('Error fetching Colors:', error);
        // fallback response
        return [];
    }
}

export default getColors;