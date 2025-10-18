import { useEffect, useState } from 'react';
import testImage from '../../assets/storefront_assets/testbg.png';
import uniqloLogo from '../../assets/storefront_assets/brandlogos/UNIQLO.svg';
import prodImage from '../../assets/storefront_assets/testimage.jpg';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ProductModal({ isOpen, onClose }: ProductModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Small delay to trigger transition
            setTimeout(() => setIsVisible(true), 10);
        } else {
            setTimeout(() => setIsVisible(false), 10);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Only close if clicking the backdrop itself, not the content
        if (e.target === e.currentTarget) {
            onClose();
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
                    <img src={prodImage} alt="product image" 
                    className='w-full h-4/5 object-cover object-top'/>
                    
                    <div className='mt-auto grid grid-cols-4 gap-1 p-1'>
                        <div className='aspect-square flex items-center justify-center overflow-hidden
                        hover:scale-105 transition-transform duration-300 cursor-pointer'>
                            <img src={prodImage} alt="sub image"
                            className='w-full h-full object-cover'/>
                        </div>
                        <div className='aspect-square flex items-center justify-center overflow-hidden
                        hover:scale-105 transition-transform duration-300 cursor-pointer'>
                            <img src={prodImage} alt="sub image"
                            className='w-full h-full object-cover'/>
                        </div>
                        <div className='aspect-square flex items-center justify-center overflow-hidden
                        hover:scale-105 transition-transform duration-300 cursor-pointer'>
                            <img src={prodImage} alt="sub image"
                            className='w-full h-full object-cover'/>
                        </div>
                        <div className='aspect-square flex items-center justify-center overflow-hidden
                        hover:scale-105 transition-transform duration-300 cursor-pointer'>
                            <img src={prodImage} alt="sub image"
                            className='w-full h-full object-cover'/>
                        </div>
                    </div>
                </div>
                <div className='relative w-3/5 flex flex-col p-5'>
                    <div className='flex w-full'>
                        <div className='flex flex-col w-1/2'>
                            <h1 className='text-4xl text-white font-bold'>AIRISM (NUDE)</h1>
                            <p className='text-gray-300 font-light'>Women's Large</p>
                        </div>
                        <div className='flex h-full aspect-square ml-auto'>
                            <img src={uniqloLogo} alt="uniqlo" className='h-20 w-auto'/>
                        </div>
                    </div>
                    <div className='h-3/4 w-full flex flex-col'>
                        <div className='flex mb-7'>
                            <div className='bg-white px-4 py-1 flex mr-3 cursor-pointer hover:bg-gray-100 transition-colors'>
                                <p>SLIM</p>
                            </div>
                            <div className='bg-white px-4 py-1 flex mr-3 cursor-pointer hover:bg-gray-100 transition-colors'>
                                <p>SOFT</p>
                            </div>
                            <div className='bg-white px-4 py-1 flex mr-3 cursor-pointer hover:bg-gray-100 transition-colors'>
                                <p>FIT</p>
                            </div>
                        </div>
                        <p className='text-xl text-white italic'>This is the item description. This may include the source of this and other information</p>
                    </div>
                    <div className='w-full flex justify-end mt-auto'>
                        <h1 className='text-lg w-1/4 text-center py-4 bg-white mr-4 transition-all duration-300
                        hover:bg-black hover:text-white cursor-pointer font-bold'>
                            ADD TO CART
                        </h1>
                        <h1 className='text-white text-lg w-1/4 text-center py-4 bg-black transition-all duration-300
                        hover:bg-white hover:text-black cursor-pointer border-2 border-white font-bold'>
                            BUY NOW
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
