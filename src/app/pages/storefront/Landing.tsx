import landingBg from '../../../assets/storefront_assets/landing_bg.jpg';
import { MenuIcon, MoveDown } from 'lucide-react';
import { motion } from 'framer-motion';


export default function Landing() {
    return (
        <>
        <div
            className="relative flex flex-col items-center h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${landingBg})` }}
            >           
            <div className="absolute inset-0 bg-black opacity-80 pointer-events-none"></div>   
            <div className='relative w-full h-20 flex items-center px-4'>
                <div>
                    <img src="/src/assets/BATB%20Logo%201 (1).svg" alt="Logo" className="h-20 ml-5" />
                </div>
                <motion.button
                    whileHover={{ 
                        scale: 1.1, 
                        rotate: 30 
                    }}
                    style={{ 
                        transformOrigin: "center" 
                    }}
                    transition={{
                        duration: 0.2, 
                        ease: "easeInOut"
                    }}
                    className='ml-auto mr-5'
                >
                <MenuIcon className="h-7 w-auto text-white cursor-pointer" />
                </motion.button>
               
            </div>

            <div className='relative h-[80vh] w-full flex'>
                <div className='w-1/2 flex flex-row-reverse items-center pr-10'>
                    <img src="/src/assets/storefront_assets/Landing_Styled.svg" alt="get dressed with style" className='h-70 w-auto'/>
                </div>
                <div className='w-1/2 flex items-center pl-10'>
                    <h1 className='text-white text-3xl tracking-wide font-light'>AT THE FRACTION OF THE COST</h1>    
                </div>
            </div>
        
            <div className='relative h-10 w-full flex justify-end items-center pr-15 text-white tracking-widest'>
                <p>CHECK IT OUT</p>
                <MoveDown className="h-5 w-5 ml-2"/>
            </div>
        </div>
        
        <div className='w-full h-[100vh] bg-white flex flex-col items-center py-10'>
            <div className='w-full h-auto flex flex-col justify-center items-center gap-5'>
                <h1 className='text-5xl sans font-bold'>WHO ARE THE BOYS AT THE BACK?</h1>
                <p className='text-lg text-center'>
                    WE are all about mall pullouts, raw style, and second chances—gear that looks better lived-in than locked up. <br></br> We bring you pieces with attitude, not price tags.
                </p>
            </div>
            <div className='w-full h-full grid grid-cols-4 grid-rows-2 gap-2 p-2'>
                <div className='justify-center items-center flex'>
                    <img src="/src/assets/storefront_assets/brandlogos/DKNY logo.png" alt="DKNY" />
                </div>
                <div className='justify-center items-center flex'>
                    <img src="/src/assets/storefront_assets/brandlogos/H&M logo.png" alt="H&M" />
                </div>
                <div className='justify-center items-center flex'>
                    <img src="/src/assets/storefront_assets/brandlogos/LEVI logo.png" alt="LEVI" />
                </div>
                <div className='justify-center items-center flex'>
                    <img src="/src/assets/storefront_assets/brandlogos/UNIQLO logo.png" alt="UNIQLO" />
                </div>
                <div className='justify-center items-center flex'>
                    <img src="/src/assets/storefront_assets/brandlogos/ZARA logo.png" alt="ZARA" />
                </div>
                <div className='justify-center items-center flex'>
                    <img src="/src/assets/storefront_assets/brandlogos/TH logo.png" alt="TH" />
                </div>
                <div className='justify-center items-center flex'>
                    <img src="/src/assets/storefront_assets/brandlogos/.png" alt="NBA" />
                </div>
                <div className='justify-center items-center flex'>
                    <img src="/src/assets/storefront_assets/brandlogos/.png" alt="NEXT" />
                </div>
            </div>
        </div>

        
                 
        </>
    );
}