import { LucideX } from 'lucide-react';
import type { CartItem } from '@/types/cart';

interface CartItemRowProps {
    item: CartItem;
    onRemove: () => Promise<void>;
    onQuantityChange: (quantity: number) => Promise<void>;
    disabled?: boolean;
}

const currencyFormatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
});

export default function CartItemRow({ item, onRemove, onQuantityChange, disabled }: CartItemRowProps) {
    const handleQuantityChange = (delta: number) => {
        const nextQuantity = Math.max(1, item.quantity + delta);
        if (nextQuantity !== item.quantity) {
            void onQuantityChange(nextQuantity);
        }
    };

    return (
        <div className='w-full flex flex-col p-2'>
            <div className='w-full min-h-[18vh] bg-white flex justify-between hover:scale-[0.99] transition-all duration-500 group'>
                <div className='h-full aspect-square p-1.5 flex items-center justify-center'>
                    <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className='h-32 w-32 object-cover object-top rounded'
                    />
                </div>
                <div className='ml-5 h-full w-full flex'>
                    <div className='h-full w-2/3 flex flex-col py-5 pr-4'>
                        <div>
                            <h1 className='text-xl font-bold text-black'>{item.product.name}</h1>
                            <p className='ml-1 text-sm text-gray-500'>{item.product.shortDescription}</p>
                            {item.size && (
                                <p className='ml-1 text-xs text-gray-600 mt-1'>
                                    Size: <span className='font-semibold'>{item.size}</span>
                                </p>
                            )}
                        </div>
                        <div className='mt-auto flex items-center gap-4'>
                            <div className='flex items-center border border-black text-black font-semibold'>
                                <button
                                    type='button'
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={disabled || item.quantity === 1}
                                    className='px-3 py-1 hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    -
                                </button>
                                <span className='px-4 py-1 border-x border-black select-none'>{item.quantity}</span>
                                <button
                                    type='button'
                                    onClick={() => handleQuantityChange(1)}
                                    disabled={disabled}
                                    className='px-3 py-1 hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                                >
                                    +
                                </button>
                            </div>
                            <h1 className='text-xl font-semibold text-black'>
                                {currencyFormatter.format(item.subtotal ?? item.price * item.quantity)}
                            </h1>
                        </div>
                    </div>
                    <div className='ml-auto h-full flex items-start p-3'>
                        <button
                            type='button'
                            onClick={() => onRemove()}
                            disabled={disabled}
                            className='p-2 rounded-full hover:bg-red-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                            aria-label={`Remove ${item.product.name}`}
                        >
                            <LucideX className='cursor-pointer group-hover:rotate-6 transition-transform hover:text-red-500' />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

