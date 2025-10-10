import { useEffect } from 'react';
import Header from '../../../components/storefront/HeaderFollow';
import Lenis from 'lenis';
import ItemContainer from '../../../components/storefront/ItemContainer';

export default function Browse(){
    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: true,
        });

    }, []);

    return (
        <>
            <div className='w-full h-[35vh] flex flex-col bg-black'
                style={{
                    backgroundImage: `url('/src/assets/storefront_assets/patterns.png')`,
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

            <div className='w-full h-[150vh] bg-white flex flex-col items-center py-5 px-10'>
                <h2 className='text-4xl font-bold mb-4'>Browse Our Collection</h2>
                <p className='text-lg text-gray-600 mb-8'>Discover the latest trends and styles.</p>
                <div className='grid grid-cols-5 gap-6'>
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                </div>
            </div>
        </>
    );
}
