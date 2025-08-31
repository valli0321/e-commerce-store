import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

interface ResponseType {
    success: boolean;
    message: string;
    data: Category[];
}

const getCategories = async (): Promise<Category[]> => {
    try {
        const res = await fetch(URL);
        const json: ResponseType = await res.json();
        return json?.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        // fallback response
        return [];
    }
}

export default getCategories;