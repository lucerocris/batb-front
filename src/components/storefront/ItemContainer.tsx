import type { Product } from '../../types/product';

interface ItemContainerProps {
    product: Product;
    onClick?: () => void;
}

export default function ItemContainer({ product, onClick }: ItemContainerProps) {   
    return (
        <div 
            style={{ perspective: 5000 }} 
            className='h-auto w-auto flex flex-col items-center transition-all duration-300 hover:scale-90 cursor-pointer'
            onClick={onClick}
        >
            <div className="w-75 h-[50vh] flex-col relative transform-gpu transition-transform duration-500 origin-center will-change-transform hover:[transform:perspective(1000px)_rotateX(6deg)_rotateY(2deg)_scale3d(1.06,1.06,1)]">
                <div className="absolute inset-0  bg-black opacity-60 backdrop-blur-lg"></div>
                <img src={product.imageUrl} alt={product.name}
                     className="relative object-cover w-full h-5/7"/>
                <div className='relative h-2/7 w-full flex flex-col px-2'>
                    <div className='w-full h-1/2 flex items-center '>
                        <div className='w-auto h-full flex flex-col py-2 '>
                            <h1 className='text-md text-white font-bold leading-5'>{product.name}</h1>
                            <p className='text-xs text-gray-300 font-light pl-2'>{product.shortDescription}</p>
                        </div>
                        <div className='ml-auto text-white text-xs font-bold uppercase px-2'>
                            {product.brand}
                        </div>
                    </div>
                    <div className='w-full mt-auto flex items-center mb-2'>
                        <h1 className='pl-1 text-white text-lg font-extrabold'>₱{product.basePrice}</h1>
                        <button className='sans text-sm ml-auto bg-white text-black font-bold px-3 py-1 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer'>ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    );
}