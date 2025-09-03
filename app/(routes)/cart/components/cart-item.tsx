"use client";

import React from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

import { useCart } from '@/hooks/use-cart';
import { Product } from '@/types';

import IconButton from '@/components/ui/icon-button';
import Currency from '@/components/ui/currency';

interface CartItemProps {
    data: Product;
};

const CartItem: React.FC<CartItemProps> = ({
    data
}) => {
    const cart = useCart();
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }

    return (
        <li className='flex py-6 border-b border-gray-300'>
            <div className='relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48'>
                <Image
                    fill
                    src={data?.images[0]?.url}
                    alt='Image'
                    className='object-cover object-center'
                />
            </div>
            <div className='relative ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                <div className='absolute z-10 top-0 right-0'>
                    <IconButton icon={<X size={15} />} onClick={() => cart.removeItemFromCart(data)} />
                </div>
                <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                    <div className='flex justify-between'>
                        <p className='text-lg font-semibold text-black'>
                            {data?.name}
                        </p>
                    </div>
                    <div className='mt-1 text-sm flex items-center gap-x-8'>
                        <div className='flex items-center gap-x-4 '>
                            <div className='h-6 w-6 rounded-full border border-gray-600' style={{ backgroundColor: data?.color?.value}}/>
                            <p>{data?.color?.name}</p>
                        </div>
                        <p>{data?.size?.name}</p>
                    </div>
                    <Currency value={data?.price}/>
                </div>
            </div>
        </li>
    )
}

export default CartItem