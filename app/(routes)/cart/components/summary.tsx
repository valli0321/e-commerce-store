"use client";

import React from 'react'
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';

import { useCart } from '@/hooks/use-cart';

import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import toast from 'react-hot-toast';

const Summary = () => {
    const cart = useCart();
    const searchParams = useSearchParams();
    const router = useRouter();

   

    return (
        <div 
            className='
                mt-16
                rounded-lg
                bg-gray-50
                px-4
                py-6
                sm:p-6
                lg:col-span-5
                lg:mt-0
                lg:p-8
            '
        >
            <h2 className='text-lg font-medium text-gray-900'>Order Summary</h2>
            <div className='mt-6 space-y-4'>
                <div className='flex items-center justify-between border-t border-gray-300 pt-4'>
                    <div className='text-base font-medium text-gray-900'>
                        Order Total
                    </div>
                    <Currency value={cart?.totalPrice} />
                </div>
            </div>
            <Button className='w-full cursor-pointer mt-6' onClick={() => router.push("/checkout")}>
                Proceed to Checkout
            </Button>
        </div>
    )
}

export default Summary