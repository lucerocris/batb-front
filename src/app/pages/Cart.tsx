import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Header from '@/components/HeaderFollow';
import MyCart from '@/components/cart/MyCart';
import Checkout from '@/components/cart/Checkout';
import Payment from '@/components/cart/Payment';
import { useCart } from '@/hooks/useCart';
import { useCheckoutForm } from '@/hooks/useCheckoutForm';

export default function Cart() {
    const [currentStep, setCurrentStep] = useState('cart'); // 'cart', 'checkout', 'payment'
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { items, total, loading, error, refetch, removeItem, clearCart } = useCart();
    const checkoutForm = useCheckoutForm();

    const handleStepChange = (newStep: string) => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentStep(newStep);
            setIsTransitioning(false);
        }, 150);
    };

    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
        });

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
        <div className='w-full h-[35vh] flex flex-col bg-black'
            style={{
                backgroundImage: `url('/assets/patterns.png')`,
                backgroundSize: '150px',
                backgroundPosition: 'center',
                }}
            >
                <div className='absolute h-[35vh] inset-0 bg-black opacity-85'></div>
                <div className='relative w-full h-full flex'>
                    <Header />
                    <div className='w-full h-full flex flex-col items-center justify-end'>
                        <p
                            className='text-2xl font-extralight -mb-14'
                            style={{ color: 'rgb(232, 204, 72)' }}
                        >
                            YOUR CURATED PICKS
                        </p>
                        <h1 className='text-[11rem] text-white sans font-extrabold tracking-wider -mb-19'>
                            CART
                        </h1>
                    </div>
                </div>
            </div>

            {/* Component with fade transition */}
            <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                {currentStep === 'cart' && (
                    <MyCart
                        items={items}
                        total={total}
                        loading={loading}
                        error={error}
                        onRetry={refetch}
                        onRemove={removeItem}
                        onClear={clearCart}
                        onCheckout={() => handleStepChange('checkout')}
                    />
                )}
                {currentStep === 'checkout' && (
                    <Checkout
                        checkoutForm={checkoutForm}
                        onPayment={() => handleStepChange('payment')}
                        onBack={() => handleStepChange('cart')}
                    />
                )}
                {currentStep === 'payment' && (
                    <Payment checkoutForm={checkoutForm} onBack={() => handleStepChange('checkout')} />
                )}
            </div>
        </>
    );
}
