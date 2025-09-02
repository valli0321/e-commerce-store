"use client";

import React, { MouseEventHandler } from 'react';

import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';

import { useCart } from '@/hooks/use-cart';

import Currency from '@/components/ui/currency';
import Button from '@/components/ui/button';

interface InfoProps {
    data: Product;
}

const Info: React.FC<InfoProps> = ({
    data
}) => {
    const cart = useCart();

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = () => {
            // event?.stopPropagation();
            console.log("Add to Cart", data)
            cart.addItemToCart(data);
    }
    return (
        <div>
            <h1 className='text-3xl font-bold text-gray-900'>{data?.name}</h1>
            <div className='mt-3 flex items-center justify-between'>
                <div className='text-2xl text-gray-900'>
                    <Currency value={data?.price} />
                </div>
            </div>
            <hr className='my-4 border-gray-300' />
            <div className='flex flex-col gap-y-6'>
                <div className='flex items-center gap-x-4 '>
                    <h3 className='font-semibold text-black'>Size:</h3>
                    <div>
                        {data?.size?.name}
                    </div>
                </div>
                <div className='flex items-center gap-x-4 '>
                    <h3 className='font-semibold text-black'>Color:</h3>
                    <div className='h-6 w-6 rounded-full border border-gray-600' style={{ backgroundColor: data?.color?.value}}/>
                </div>
            </div>
            <div className='mt-10 flex items-center gap-x-3'>
                <Button 
                    className='flex items-center gap-x-2'
                    onClick={onAddToCart}
                >
                    Add to cart
                    <ShoppingCart />
                </Button>
            </div>
        </div>
    )
}

export default Info