import { MoveDown } from 'lucide-react';
import landingBg from '/assets/storefront_assets/landing_bg.jpg';
import Header from './HeaderStatic';

export default function HeroSection() {
    return (
        <div
            className="relative flex flex-col items-center h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${landingBg})` }}
        >           
            <div className="absolute inset-0 bg-black opacity-80 pointer-events-none"></div>   
            
            <Header color="white"/>

            <div className='relative h-[90vh] w-full flex'>
                <div className='w-1/2 flex flex-row-reverse items-center pr-10'>
                    <img src="/assets/storefront_assets/Landing_Styled.svg" alt="get dressed with style" className='h-70 w-auto'/>
                </div>
                <div className='w-1/2 flex items-center pl-10'>
                    <h1 className='text-white text-3xl tracking-wide font-light'>AT THE FRACTION OF THE COST</h1>    
                </div>
            </div>
        
            <div className='relative h-[10vh] w-full flex justify-end items-center pr-15 text-white tracking-widest'>
                <p>CHECK IT OUT</p>
                <MoveDown className="h-5 w-5 ml-2"/>
            </div>
        </div>
    );
}