import browseBg from '../../assets/storefront_assets/patterns.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Header from './HeaderStatic';

export default function BrowseSection() {
    return (
        <div className='relative w-full h-[100vh] flex flex-col items-center'
            style={{ backgroundImage: `url(${browseBg})`, backgroundRepeat: 'repeat', backgroundPosition: 'center', backgroundSize: '160px' }}>
            <div className='w-full h-full bg-black opacity-85 absolute pointer-events-none'></div>
            <div className='w-full h-full relative py-20'>
                <Header color="white"/>
                <div className='w-full h-auto flex items-center'>
                    <h1 className='text-7xl text-white font-bold px-12 py-2'>
                        BROWSE
                    </h1>
                    <p className='text-2xl font-extralight'
                    style={{color: 'rgb(232, 204, 72)'}}>
                        It's as simple as that.
                    </p>
                </div>
                <div className='w-full h-full flex items-center '>
                    <div className='flex-5 flex items-center justify-center'>
                        <ChevronLeft className='text-white h-20 w-auto hover:scale-111 hover:text-gray-400 transition-transform duration-300' />
                    </div>
                    <div className='h-full flex items-center w-full justify-center '>
                        
                    </div>
                    <div className='flex-5 flex items-center justify-center'>
                        <ChevronRight className='text-white h-20 w-auto hover:scale-111 hover:text-gray-400 transition-transform duration-300' />
                    </div>
                </div>
            </div>
        </div>
    );
}