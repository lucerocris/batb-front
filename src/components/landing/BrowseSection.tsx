import Header from '../HeaderStatic';
import { useProducts } from '@/hooks/useProducts';
import { useEffect } from 'react';

export default function BrowseSection() {
    const { products = [], loading, error } = useProducts();

    const track = document.getElementById("image-track");

    useEffect(() => {
        window.onmousedown = (e) => {
            e.clientX;
        };

        return () => {
            window.onmousedown = null;
        };
    }, []);

    return (
        <div className='relative w-full h-[100vh] flex flex-col items-center pb-10'
            style={{ backgroundImage: `url('../../../public/assets/patterns.png')`, backgroundRepeat: 'repeat', backgroundPosition: 'center', backgroundSize: '160px' }}>
            <div className='w-full h-full bg-black opacity-85 absolute pointer-events-none'></div>
            <div className='w-full h-full relative py-20'>
                <Header color="white"/>
                <div className='w-full h-auto flex items-center px-7 py-5'>
                    <h1 className='text-7xl text-white font-bold'>
                        BROWSE
                    </h1>
                    <p className='text-2xl font-extralight ml-auto'
                    style={{color: 'rgb(232, 204, 72)'}}>
                        It's as simple as that.
                    </p>
                </div>
                <div className='w-full h-full flex items-center justify-center px-7'>
                    {loading ? (
                        <div className="text-white text-xl">Loading images...</div>
                    ) : error ? (
                        <div className="text-red-400 text-xl">Error loading images</div>
                    ) : (
                        <div id='image-track' className="flex gap-2 absolute">
                            {products.map((product: any, index: number) => (
                                <div key={index} className="w-full overflow-hidden">
                                    <img 
                                        src={product.imageUrl} 
                                        alt={product.name || `Product ${index + 1}`}
                                        className="w-[50vw] h-[60vh] object-cover object-center"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}