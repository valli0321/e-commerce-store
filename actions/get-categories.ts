import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

interface ResponseType {
    success: boolean;
    message: string;
    data: Category[];
}

const getCategories = async (): Promise<ResponseType> => {
    try {
        const res = await fetch(URL);
    
        return await res.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        // fallback response
        return {
            success: false,
            message: 'Failed to fetch categories',
            data: []
        };

    }
}

export default getCategories;