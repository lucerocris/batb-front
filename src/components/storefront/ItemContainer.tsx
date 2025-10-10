import testImage from '../../assets/storefront_assets/testimage.jpg';
import uniqloLogo from '../../assets/storefront_assets/brandlogos/UNIQLO.svg';

export default function ItemContainer() {   
    return (
        <div style={{ perspective: 5000 }} className='w-full h-[100vh] flex flex-col items-center py-20 transition-all duration-300 hover:scale-90'>
            <div className="w-75 h-100 flex-col relative transform-gpu transition-transform duration-500 origin-center will-change-transform hover:[transform:perspective(1000px)_rotateX(6deg)_rotateY(2deg)_scale3d(1.06,1.06,1)]">
                <div className="absolute inset-0  bg-black opacity-60 backdrop-blur-lg"></div>
                <img src={testImage} alt="testimage"
                     className="relative object-cover w-full h-3/4"/>
                <div className='relative h-1/4 w-full flex flex-col px-2'>
                    <div className='w-full h-1/2 flex items-center'>
                        <div className='w-auto h-full flex flex-col justify-center'>
                            <h1 className='text-lg text-white font-bold'>AIRISM (NUDE)</h1>
                            <p className='text-xs text-gray-300 font-light pl-2 -mt-2'>Women's Large</p>
                        </div>
                        <img src={uniqloLogo} alt="uniqlo" className='ml-auto h-8' />
                    </div>
                    <div className='w-full h-1/2 flex items-center'>
                        <h1 className='pl-2 text-white text-md font-extrabold'>P 550.00</h1>
                        <button className='sans text-sm ml-auto bg-white text-black font-bold px-3 py-1 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer'>ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    );
}