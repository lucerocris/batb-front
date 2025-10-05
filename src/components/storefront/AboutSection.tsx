import BrandLogos from './BrandLogos';
import Header from './HeaderStatic';

export default function AboutSection() {
    return (
        <div className='w-full h-[100vh] bg-white flex flex-col items-center py-20'>
            <Header color="black" />
            <div className='w-full h-auto flex flex-col justify-center items-center gap-5'>
                <h1 className='text-5xl sans font-bold'>WHO ARE THE BOYS AT THE BACK?</h1>
                <p className='text-lg text-center'>
                    WE are all about mall pullouts, raw style, and second chances—gear that looks better lived-in than locked up. <br></br> We bring you pieces with attitude, not price tags.
                </p>
            </div>
            <BrandLogos />
        </div>
    );
}