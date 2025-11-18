import testImage from '../../../assets/storefront_assets/testbg.png';
import uniqloLogo from '../../../assets/storefront_assets/brandlogos/UNIQLO.svg';
import prodImage from '../../../assets/storefront_assets/testimage.jpg';
import { useProducts } from '@/hooks/useProducts';

export default function Test() {   
    const { products = [], loading, error } = useProducts();

    if (loading) {
        return <div>Loading...</div>;
    }

    const testProduct = products[0];

    return (
        <div className='bg-white w-full h-screen flex items-center justify-center relative'>
            
            <div className='h-3/4 w-3/5 relative p-2 flex gap-2'>
                <div className='absolute inset-0 bg-black opacity-90'></div>    
                <div className='relative h-full w-2/5 flex flex-col'> 
                    <img src={testProduct.imageUrl} alt="product image" 
                    className='w-full h-4/5 object-cover object-top'/>
                    
                    <div className='mt-auto grid grid-cols-4 gap-1 p-1'>
                        <div className='aspect-square flex items-center justify-center overflow-hidden
                        hover:scale-105 transition-transform duration-300'>
                            <img src={testProduct.imageUrl} alt="sub image"
                            className='w-full h-full object-cover'/>
                        </div>
                        <div className='aspect-square flex items-center justify-center overflow-hidden
                        hover:scale-105 transition-transform duration-300'>
                            <img src={testProduct.imageUrl} alt="sub image"
                            className='w-full h-full object-cover'/>
                        </div>
                        <div className='aspect-square flex items-center justify-center overflow-hidden
                        hover:scale-105 transition-transform duration-300'>
                            <img src={testProduct.imageUrl} alt="sub image"
                            className='w-full h-full object-cover'/>
                        </div>
                        <div className='aspect-square flex items-center justify-center overflow-hidden
                        hover:scale-105 transition-transform duration-300'>
                            <img src={testProduct.imageUrl} alt="sub image"
                            className='w-full h-full object-cover'/>
                        </div>
                    </div>
                </div>
                <div className='relative w-3/5 flex flex-col p-5'>
                    <div className='flex w-full '>
                        <div className='flex flex-col w-1/2'>
                            <h1 className='text-4xl text-white font-bold'>{testProduct.name}</h1>
                            <p className='text-gray-300 font-light'>Women's Large</p>
                        </div>
                        <div className='flex h-full aspect-square ml-auto  justify-end'>
                            <img src={uniqloLogo} alt="uniqlo" className='h-20 w-auto'/>
                        </div>
                    </div>
                    <div className='h-3/4 w-full flex flex-col mt-5'>
                        <div className='flex mb-7'>
                            <div className='bg-white px-4 py-1 flex mr-3'>
                                <p>SLIM</p>
                            </div>
                            <div className='bg-white px-4 py-1 flex mr-3'>
                                <p>SOFT</p>
                            </div>
                            <div className='bg-white px-4 py-1 flex mr-3'>
                                <p>FIT</p>
                            </div>
                        </div>
                        <p className='text-xl text-white italic'>{testProduct.description}</p>
                    </div>
                    <div className='w-full flex justify-end mt-auto'>
                        <h1 className='text-lg w-1/4 text-center py-4 bg-white mr-4 transition-all duration-300
                        hover:bg-black hover:text-white cursor-pointer hover:border-1'>
                            ADD TO CART
                        </h1>
                        <h1 className='text-white text-lg w-1/4 text-center py-4 bg-black transition-all duration-300
                        hover:bg-white hover:text-black cursor-pointer border-1'>
                            BUY NOW
                        </h1>
                    </div>
                </div>
            </div>
        
        </div>
    );
}