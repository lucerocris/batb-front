import { useEffect, useState } from 'react';
import { useProducts } from '../../../hooks/useProducts';
import Header from '../../../components/storefront/HeaderFollow';

import testImage from '../../../assets/storefront_assets/testimage.jpg';
import CheckoutItem from '../../../components/storefront/CheckoutItem.';

import Lenis from 'lenis';
import { LucideX } from 'lucide-react';


export default function Cart(){
    
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
        });
        
        return () => {
            lenis.destroy();
        };
    }, []);
    
    return(
        <>
        <div className='w-full h-[35vh] flex flex-col bg-black'
            style={{
                backgroundImage: `url('/src/assets/storefront_assets/patterns.png')`,
                backgroundSize: '150px',
                backgroundPosition: 'center',
                }}
        >
            <div className='absolute h-[35vh] inset-0 bg-black opacity-85'></div>
            <div className='relative w-full h-full flex'>
                <Header />
                <div className='w-full h-full flex flex-col items-center justify-end'>
                    <p className='text-2xl font-extralight -mb-14'
                    style={{color: 'rgb(232, 204, 72)'}}>
                        YOUR CURATED PICKS
                    </p>
                    <h1 className='text-[11rem] text-white sans font-extrabold tracking-wider -mb-19'>
                        CART
                    </h1>
                </div>
            </div>
        </div>

        <div className='w-full min-h-screen bg-white flex flex-col items-center py-5 px-5'>
            <div className='border-b-4 border-black w-full h-[10vh] flex items-center'>
                <h1 className='text-3xl font-semibold'>MY CART</h1>
            </div>
            <div className='w-full flex items-center justify-center gap-2 my-2'>
                <p className='text-lg font-semibold'>Cart &gt;</p>
                <p className='text-lg font-semibold text-gray-400'>Checkout &gt;</p>
                <p className='text-lg font-semibold text-gray-400'>Payment &gt;</p>
            </div>
            <div className='w-full h-full flex'>

                <div className='w-2/3 h-full flex bg-gray-200 flex-col'>
                    <CheckoutItem />
                    <CheckoutItem />
                    <CheckoutItem />
                </div>
                <div className='w-1/3 h-full flex bg-gray-200 ml-1 p-2'>
                    <div className='w-full h-[20vh] bg-white'> 

                    </div>
                </div>
            </div>
        </div>
        </>
    )
}