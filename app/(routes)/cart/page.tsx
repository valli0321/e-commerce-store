"use client"

import React from 'react';

import { useCart } from '@/hooks/use-cart';

import Container from '@/components/ui/container';
import CartItem from './components/cart-item';
import Summary from './components/summary';
import { Product } from '@/types';

const CartPage = () => {

    const [isMounted, setIsMounted] = React.useState(false);
    const cart = useCart();

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted){
        return null;
    }


    return (
        <div className='bg-white'>
            <Container>
                <div className='px-4 py-16 sm:px-6 lg:px-8'>
                    <h3 className='text-3xl font-bold text-black'>Shopping Cart</h3>
                    <div className='mt-12 grid md:grid-cols-12 lg:items-start gap-x-2'>
                        <div className='lg:col-span-7'>
                            {cart.isEmpty && <p className='text-neutral-500'>No items added to Cart.</p>}
                            <ul>
                                {cart.items.map((item: Product) => (
                                    <CartItem
                                        key={item?.id}
                                        data={item}
                                    />
                                ))}
                            </ul>
                        </div>
                        <Summary/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default CartPage