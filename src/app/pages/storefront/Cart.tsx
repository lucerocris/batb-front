import { useEffect, useState } from 'react';
import { useProducts } from '../../../hooks/useProducts';
import Header from '../../../components/storefront/HeaderFollow';

import MyCart from '../../../components/storefront/MyCart'
import Checkout from '../../../components/storefront/Checkout'

import Lenis from 'lenis';


export default function Cart(){
    const [currentStep, setCurrentStep] = useState('cart'); // 'cart', 'checkout', 'payment'
    
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

        {/* {currentStep === 'cart' && <MyCart onCheckout={() => setCurrentStep('checkout')} />} */}
        <div className='transition-all duration-300'>
            {currentStep === 'cart' && <MyCart />}
            {currentStep === 'checkout' && <Checkout />}
            {currentStep === 'payment' && <div>Payment Component Coming Soon</div>}
        </div>
        <Checkout></Checkout>
        </>
    )
}