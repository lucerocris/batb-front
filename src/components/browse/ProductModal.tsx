import { useEffect, useState } from 'react';
import type { Product} from "@/types/product.ts";
import { addToCart } from '@/services/cartService';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setTimeout(() => setIsVisible(false), 10);
        }
    }, [isOpen]);

    useEffect(() => {
        setFeedback(null);
    }, [product?.id, isOpen]);

    if (!isOpen || !product) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only close if clicking the backdrop itself, not the content
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const variantArray = Array.isArray(product.productVariants) ? product.productVariants : [];
    const variantImages = variantArray.slice(0, 4);
    const fallbackImage = product.imageUrl || '';

    const imagesToShow = variantImages.length > 0
        ? variantImages.map(v => v?.imageUrl || fallbackImage)
        : [fallbackImage, fallbackImage, fallbackImage, fallbackImage];

    const firstVariantName = variantArray[0]?.name;

    const handleAddToCart = async () => {
        if (!product || isAdding) return;

        try {
            setIsAdding(true);
            setFeedback(null);
            const response = await addToCart({
                productId: product.id,
                size: null,
            });
            setFeedback({
                type: 'success',
                message: response.message || 'Added to cart',
            });
        } catch (error) {
            setFeedback({
                type: 'error',
                message: error instanceof Error ? error.message : 'Failed to add to cart',
            });
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div 
            className={`fixed inset-0 w-full h-screen flex items-center justify-center z-50 transition-opacity duration-300 ${
                isVisible ? 'opacity-100 backdrop-blur-sm' : 'opacity-0'
            }`}
            onClick={handleBackdropClick}
        >
           
            
            <div className='h-3/4 w-3/5 relative p-2 flex gap-2'>
                <div className='absolute inset-0 bg-black opacity-90'></div>    
                <div className='relative h-full w-2/5 flex flex-col'> 
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className='w-full h-4/5 object-cover object-top'
                    />
                    
                    <div className='mt-auto grid grid-cols-4 gap-1 p-1'>
                        {imagesToShow.map((image, index) => (
                            <div 
                                key={index}
                                className='aspect-square flex items-center justify-center overflow-hidden
                                hover:scale-105 transition-transform duration-300 cursor-pointer'
                            >
                                <img 
                                    src={image} 
                                    alt={`${product.name} variant ${index + 1}`}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='relative w-3/5 flex flex-col p-5'>
                    <div className='flex w-full'>
                        <div className='flex flex-col w-3/4'>
                            <h1 className='text-4xl text-white font-bold leading-tight'>{product.name}</h1>
                            <p className='text-gray-300 font-light'>
                                {firstVariantName || product.color || 'Standard'}
                            </p>
                        </div>
                        <div className='flex h-full aspect-square ml-auto'>
                            <div className='h-20 aspect-square w-auto text-white text-xs flex items-center justify-center p-2'>
                                <img 
                                    src={`/assets/brandlogos/${product.brand?.toUpperCase()}.svg`} 
                                    alt={product.brand} 
                                    className='object-contain w-full h-full hover:scale-120 transition-transform duration-300'
                                    style={{ filter: 'drop-shadow(0 0 0 white) drop-shadow(1px 0 0 white) drop-shadow(-1px 0 0 white) drop-shadow(0 1px 0 white) drop-shadow(0 -1px 0 white)' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='h-3/4 w-full flex flex-col'>
                        <div className='flex mb-7 mt-5'>
                            {/* Display color as tag */}
                            {product.color && (
                                <div className='bg-white px-4 py-1 flex mr-3 cursor-pointer hover:scale-105 transition-all duration-300'>
                                    <p>{product.color.toUpperCase()}</p>
                                </div>
                            )}
                            {/* Display type as tag */}
                            <div className='bg-white px-4 py-1 flex mr-3 cursor-pointer hover:scale-105 transition-all duration-300'>
                                <p>{product.type.toUpperCase()}</p>
                            </div>
                            {/* Display category as tag */}
                            <div className='bg-white px-4 py-1 flex mr-3 cursor-pointer hover:scale-105 transition-all duration-300'>
                                <p>{product.category.name.toUpperCase()}</p>
                            </div>
                        </div>
                        <p className='text-xl text-white italic leading-relaxed'>
                            {product.description || product.shortDescription}
                        </p>
                    </div>
                    <div className='w-full flex mt-auto items-center'>
                        <h1 className='text-white font-bold text-4xl'>
                            ₱{product.salePrice || product.basePrice}
                        </h1>
                        {product.salePrice && (
                            <span className='text-gray-400 line-through ml-3 text-xl'>
                                ₱{product.basePrice}
                            </span>
                        )}
                        <div className='flex w-1/2 ml-auto flex-col items-end'>
                            <div className='flex w-full items-center mb-3'>
                                <p className='text-sm uppercase tracking-wide text-white/80'>
                                    Single-item pullout
                                </p>
                            </div>
                            <div className='flex w-full'>
                                <button
                                    type='button'
                                    onClick={handleAddToCart}
                                    disabled={isAdding}
                                    className={`text-lg w-1/2 text-center py-4 bg-white mr-4 transition-all duration-300 font-bold ${
                                        isAdding ? 'opacity-60 cursor-not-allowed' : 'hover:bg-black hover:text-white cursor-pointer'
                                    }`}
                                >
                                    {isAdding ? 'ADDING...' : 'ADD TO CART'}
                                </button>
                                <button
                                    type='button'
                                    className='text-white text-lg w-1/2 text-center py-4 bg-black transition-all duration-300
                                    hover:bg-white hover:text-black cursor-pointer border-2 border-white font-bold'
                                >
                                    BUY NOW
                                </button>
                            </div>
                            {feedback && (
                                <p className={`mt-2 text-sm ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                    {feedback.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}