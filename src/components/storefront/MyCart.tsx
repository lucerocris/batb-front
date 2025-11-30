import { useMemo, useState } from 'react';
import type { CartItem } from '@/types/cart';
import CartItemRow from './CartItemRow';

interface MyCartProps {
    items: CartItem[];
    total: number;
    loading: boolean;
    error: string | null;
    onRetry: () => void;
    onRemove: (id: string) => Promise<void>;
    onClear: () => Promise<void>;
    onCheckout?: () => void;
    onBack?: () => void;
}

const currencyFormatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
});

export default function MyCart({
    items,
    total,
    loading,
    error,
    onRetry,
    onRemove,
    onClear,
    onCheckout,
    onBack,
}: MyCartProps) {
    const [pendingItemId, setPendingItemId] = useState<string | null>(null);
    const [isClearing, setIsClearing] = useState(false);

    const totalItems = useMemo(() => items.length, [items]);
    const previewImages = useMemo(() => items.slice(0, 3).map(item => item.product.imageUrl), [items]);

    const handleRemove = async (id: string) => {
        setPendingItemId(id);
        try {
            await onRemove(id);
        } finally {
            setPendingItemId(null);
        }
    };

    const handleClearCart = async () => {
        setIsClearing(true);
        try {
            await onClear();
        } finally {
            setIsClearing(false);
        }
    };

    const renderCartState = () => {
        if (loading) {
            return (
                <div className='flex flex-1 w-full items-center justify-center'>
                    <p className='text-lg text-gray-700'>Loading your cart...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className='flex flex-1 w-full flex-col items-center justify-center gap-3 text-center px-6'>
                    <p className='text-lg text-red-500'>Failed to load cart: {error}</p>
                    <button
                        type='button'
                        onClick={onRetry}
                        className='px-4 py-2 bg-black text-white font-semibold hover:bg-gray-900 transition-colors rounded'
                    >
                        Retry
                    </button>
                </div>
            );
        }

        if (!items.length) {
            return (
                <div className='flex flex-1 w-full flex-col items-center justify-center gap-3 text-center px-6'>
                    <h2 className='text-2xl font-semibold'>Your cart is empty</h2>
                    <p className='text-gray-600'>Browse products and add items to see them here.</p>
                </div>
            );
        }

        return (
            <>
                {items.map(item => (
                    <CartItemRow
                        key={item.id}
                        item={item}
                        onRemove={() => handleRemove(item.id)}
                        disabled={pendingItemId === item.id || isClearing}
                    />
                ))}
                <div className='px-4 pb-4 flex justify-between'>
                    <button
                        type='button'
                        onClick={handleClearCart}
                        disabled={isClearing || !items.length}
                        className='text-sm uppercase tracking-wide text-red-600 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        {isClearing ? 'Clearing...' : 'Clear cart'}
                    </button>
                    <p className='text-sm text-gray-500'>{totalItems} item(s)</p>
                </div>
            </>
        );
    };

    return (
        <div className='w-full min-h-screen bg-white flex flex-col items-center py-5 px-5'>
            <div className='border-b-4 border-black w-full h-[10vh] flex items-center'>
                <h1 className='text-3xl font-semibold'>MY CART</h1>
            </div>
            <div className='w-full flex items-center justify-center gap-2 my-2'>
                <p className='text-lg font-semibold'>Cart &gt;</p>
                <p className='text-lg font-semibold text-gray-400'>Checkout &gt;</p>
                <p className='text-lg font-semibold text-gray-400'>Payment</p>
            </div>
            <div className='w-full h-full flex flex-col lg:flex-row gap-2'>
                <div className='lg:w-2/3 w-full flex bg-gray-200 flex-col min-h-[50vh]'>{renderCartState()}</div>
                <div className='lg:w-1/3 w-full'>
                    <div className='w-full h-full flex flex-col bg-gray-200 p-2'>
                        <div className='w-full bg-white p-4'>
                            <div className='flex flex-col w-full'>
                                <h1 className='text-xl font-semibold'>Order Summary</h1>
                                <span className='text-sm text-gray-500'>Review your selections before checkout.</span>

                                <div className='max-h-[8vh] w-full mt-3 flex gap-2'>
                                    {previewImages.length ? (
                                        previewImages.map((image, index) => (
                                            <div
                                                key={`${image}-${index}`}
                                                className='h-[8vh] aspect-square hover:scale-[1.02] transition-all duration-300 overflow-hidden rounded'
                                            >
                                                <img src={image} className='w-full h-full object-top object-cover' alt='Cart preview' />
                                            </div>
                                        ))
                                    ) : (
                                        <p className='text-sm text-gray-400'>Items will appear here.</p>
                                    )}
                                </div>
                            </div>

                            <div className='w-full flex mt-4 border-t border-black pt-3'>
                                <div className='flex-1'>
                                    <h2 className='text-md font-semibold'>Subtotal</h2>
                                    <p className='text-sm text-gray-500'>Taxes and shipping calculated at checkout.</p>
                                </div>
                                <div className='text-right font-semibold'>
                                    {currencyFormatter.format(total)}
                                </div>
                            </div>

                            <div className='w-full flex mt-2 border-t border-black pt-3'>
                                <h1 className='font-bold'>Total</h1>
                                <p className='w-1/2 ml-auto text-right font-bold text-lg'>
                                    {currencyFormatter.format(total)}
                                </p>
                            </div>
                        </div>
                        <div className='w-full h-[10vh] flex p-1 bg-white'>
                            <button
                                type='button'
                                onClick={onCheckout}
                                disabled={!items.length || loading || !!error}
                                className='h-full w-full bg-black text-white items-center justify-center flex duration-300 hover:text-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                PROCEED
                            </button>
                        </div>
                        {onBack && (
                            <div className='w-full h-[8vh] flex p-1 bg-white'>
                                <button
                                    type='button'
                                    onClick={onBack}
                                    className='h-full w-full bg-gray-500 text-white items-center justify-center flex duration-300 hover:bg-gray-600'
                                >
                                    ← GO BACK
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}