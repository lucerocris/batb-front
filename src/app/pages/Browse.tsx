import { useEffect, useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import Header from '@/components/HeaderFollow';
import Lenis from 'lenis';
import ItemContainer from '../../components/browse/ItemContainer';
import ProductModal from '../../components/browse/ProductModal';

export default function Browse(){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const { products = [], loading, error } = useProducts();

    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
        });
        
        return () => {
            lenis.destroy();
        };
    }, []);

    const handleOpenModal = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    if(loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <p className="text-xl">Loading products...</p>
            </div>
        );
    }

    if(error) {
        return (
            <div className="w-full h-screen flex items-center justify-center flex-col">
                <p className="text-xl text-red-500">Error: {error}</p>
                <p className="text-sm text-gray-500 mt-2">Failed to connected to the database</p>
            </div>
        );
    }

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
                        <p className='text-2xl font-extralight -mb-14'
                        style={{color: 'rgb(232, 204, 72)'}}>
                            IT'S AS SIMPLE AS THAT.
                        </p>
                        <h1 className='text-[11rem] text-white sans font-extrabold tracking-wider -mb-19'>
                            BROWSE
                        </h1>
                    </div>
                </div>
            </div>

            <div className='w-full h-auto bg-white flex flex-col items-center py-5 px-10'>
                <h2 className='text-4xl font-bold mb-4'>Browse Our Collection</h2>
                <p className='text-lg text-gray-600 mb-8'>Dont miss these great deals.</p>
                <div className='h-auto grid grid-cols-5 gap-10'>
                    {products.map((product) => (
                        <ItemContainer 
                            key={product.id}
                            product={product}
                            onClick={() => handleOpenModal(product)} 
                        />
                    ))}
                </div>
            </div>

            <div className='h-[5vh] w-full bg-black'>
                 
            </div>

            <ProductModal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal}
                product={selectedProduct}
            />
        </>
    );
}
