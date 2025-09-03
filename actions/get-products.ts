import qs from "query-string";

import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

interface ResponseType {
    success: boolean;
    message: string;
    data: Product[];
}

interface Query {
    categoryId?: string;
    sizeId?: string;
    colorId?: string;
    isFeatured?: boolean;
    isArchived?: boolean
}

const getProducts = async (query: Query): Promise<Product[]> => {
    const url = qs.stringifyUrl({
        url: URL,
        query: {
            colorId: query.colorId,
            categoryId: query.categoryId,
            sizeId: query.sizeId,
            isFeatured: query?.isFeatured,
            isArchived: query?.isArchived,
        },
    })
    try {
        const res = await fetch(url);
        const json: ResponseType = await res.json();
        return json?.data;
    } catch (error) {
        console.error('Error fetching Products:', error);
        // fallback response
        return []
    }
}

export default getProducts;