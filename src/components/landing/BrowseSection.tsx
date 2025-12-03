import Header from '../HeaderStatic';
import { useProducts } from '@/hooks/useProducts';
import { useEffect } from 'react';

export default function BrowseSection() {
    const { products = [], loading, error } = useProducts();

    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            const track = document.getElementById("image-track") as HTMLElement | null;
            if (track) track.dataset.mouseDownAt = e.clientX.toString();
        };

        const handleMouseUp = () => {
            const track = document.getElementById("image-track") as HTMLElement | null;
            if (!track) return;
            track.dataset.mouseDownAt = "0";
            track.dataset.prevPercentage = track.dataset.percentage || "0";
        };

        const handleMouseMove = (e: MouseEvent) => {
            const track = document.getElementById("image-track") as HTMLElement | null;
            const mouseDownAt = track?.dataset.mouseDownAt;
            // Only act when mouse is pressed (mouseDownAt is set)
            if (!mouseDownAt || mouseDownAt === "0") return;

            const mouseDelta = parseFloat(mouseDownAt) - e.clientX;
            const maxDelta = window.innerWidth / 2;
            const percentage = (mouseDelta / maxDelta) * -100;
            const prevPercentage = parseFloat(track.dataset.prevPercentage || "0");
            const nextPercentageUnclamped = prevPercentage + percentage;
            const nextPercentage = Math.max(-85, Math.min(nextPercentageUnclamped, -5));

            track.dataset.percentage = String(nextPercentage);

            track.animate({
                transform: `translate(0, ${nextPercentage}%)`
            }, { duration: 300, fill: "forwards" });

            for(const image of track.getElementsByClassName("image")) {
                image.animate({
                    objectPosition: `50% -${nextPercentage*2.2}%`
                }, { duration: 200, fill: "forwards" });

            }
            // use `percentage` to update the UI (e.g. transform the track) as needed
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);


    return (
        <div className='relative w-full h-[100vh] flex flex-col items-center pb-10'
            style={{ backgroundImage: `url('../../../public/assets/patterns.png')`, backgroundRepeat: 'repeat', backgroundPosition: 'center', backgroundSize: '160px' }}>
            <div className='w-full h-full bg-black opacity-85 absolute pointer-events-none'></div>
            <div className='w-full h-full relative py-20'>
                <Header color="white"/>
                <div className='w-full h-auto flex items-center px-7 py-5'>
                    <h1 className='text-7xl text-white font-bold select-none'>
                        BROWSE
                    </h1>
                    <p className='text-2xl font-extralight ml-auto select-none'
                    style={{color: 'rgb(232, 204, 72)'}}>
                        It's as simple as that.
                    </p>
                </div>
                <div className='content-here w-full h-full flex items-center justify-center  relative'>
                    {/* How It Works Instructions */}
                    <div className="relative w-1/2 h-full flex flex-col justify-center px-10 ml-1  right-20 select-none">
                        <h2 className="text-4xl font-bold text-white mb-8 select-none">
                            HOW IT WORKS
                        </h2>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="text-yellow-500 font-bold text-xl rounded-full w-10 h-10 flex items-center justify-center mr-6 flex-shrink-0">
                                    1
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">BROWSE COLLECTION</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        Explore our curated selection of authentic mall pullouts from premium brands.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="text-yellow-500 font-bold text-xl rounded-full w-10 h-10 flex items-center justify-center mr-6 flex-shrink-0">
                                    2
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">ADD TO CART</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        Select your desired items and add them to your shopping cart with ease.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="text-yellow-500 font-bold text-xl rounded-full w-10 h-10 flex items-center justify-center mr-6 flex-shrink-0">
                                    3
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">CHECKOUT & PAY</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        Complete your order with secure payment options and provide delivery details.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <div className="text-yellow-500 font-bold text-xl w-10 h-10 flex items-center justify-center mr-6 flex-shrink-0">
                                    4
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">FAST DELIVERY</h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        Receive your premium fashion pieces delivered straight to your doorstep.
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 p-4 bg-yellow-500 bg-opacity-20 rounded-lg border border-yellow-500">
                            <p className="text-white text-center font-medium">
                                ✨ All items are authentic mall pullouts at unbeatable prices ✨
                            </p>
                        </div>
                    </div>
                    <div className='w-1/4 h-full flex items-center justify-center overflow-hidden relative  min-h-[60vh]'>
                        {loading ? (
                            <div className="text-white text-2xl">LOADING</div>
                        ) : error ? (
                            <div className="text-red-400 text-5xl">ERROR LOADING IMAGES</div>
                        ) : (
                            <div id='image-track' className="flex flex-col gap-5 absolute left-0 top-1/2 select-none w-full" 
                            data-mouse-down-at="0" data-prev-percentage="0" style={{ transform: 'translate(0%, 0%)' }}>
                                {products.map((product: any, index: number) => (
                                    <div
                                    key={index}
                                    className="w-[25vw] h-[60vh] overflow-hidden flex-shrink-0 "
                                    >
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name || `Product ${index + 1}`}
                                        draggable="false"
                                        className="image w-full h-full object-cover scale-150 select-none"
                                    />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                        

                </div>
            </div>
        </div>
    );
}