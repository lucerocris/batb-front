import { useEffect, useRef } from 'react';
import Header from '../HeaderStatic';
import { useProducts } from '@/hooks/useProducts';

export default function BrowseSection() {
    const { products = [], loading, error } = useProducts();
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const handleMouseDown = (e: MouseEvent) => {
            track.dataset.mouseDownAt = e.clientY.toString();
        };

        const handleMouseUp = () => {
            track.dataset.mouseDownAt = "0";
            track.dataset.prevPercentage = track.dataset.percentage || "-50";
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (track.dataset.mouseDownAt === "0") return;

            const mouseDelta = parseFloat(track.dataset.mouseDownAt!) - e.clientY;
            const maxDelta = window.innerHeight / 2;

            const percentage = (mouseDelta / maxDelta) * -100;
            const nextPercentageUnclamped = parseFloat(track.dataset.prevPercentage || "-50") + percentage;
            const nextPercentage = Math.max(-95, Math.min(nextPercentageUnclamped, -5));

            track.dataset.percentage = nextPercentage.toString();

            // ANIMATION FIX: Using .animate() creates the smooth inertia effect
            // The fill: "forwards" ensures it stays at the end position
            track.animate({
                transform: `translate(-50%, ${nextPercentage}%)`
            }, { duration: 300, fill: "forwards" });

            // PARALLAX FIX:
            // To make the image look "steady" (fixed in space), we invert the percentage 1:1.
            // As the track moves UP (-5 to -95), the image pans DOWN (5 to 95) inside the frame.
            for(const image of track.getElementsByClassName("image")) {
                image.animate({
                    objectPosition: `50% ${-nextPercentage}%`
                }, { duration: 1200, fill: "forwards" });
            }
        };

        // Attach to window so dragging works even if mouse leaves the element
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [products]); // Re-run if products change

    return (
        <div className='relative w-full h-[100vh] flex flex-col overflow-hidden bg-zinc-900 select-none'
             style={{ 
                 backgroundImage: `radial-gradient(circle at center, #2a2a2a 1px, transparent 1px), radial-gradient(circle at center, #1a1a1a 1px, transparent 1px)`,
                 backgroundSize: '40px 40px',
                 backgroundPosition: '0 0, 20px 20px',
                 backgroundColor: '#111' 
             }}>
            
            {/* Dark Overlay */}
            <div className='absolute inset-0 bg-black opacity-80 pointer-events-none z-0'></div>

            {/* Main Content Wrapper */}
            <div className='relative z-10 w-full h-full flex flex-col'>
                
                <Header color="white"/>

                {/* Header Content Area */}
                <div className='flex-shrink-0 mt-16 px-10 py-2'>
                    <div className='w-full flex items-center'>
                        <h1 className='text-6xl md:text-7xl text-white font-bold select-none tracking-tighter'>
                            BROWSE
                        </h1>
                        <p className='hidden md:block text-xl font-light ml-auto select-none italic'
                           style={{color: 'rgb(232, 204, 72)'}}>
                            It's as simple as that.
                        </p>
                    </div>
                </div>

                {/* Split Content Area */}
                <div className='flex-1 w-full flex flex-row overflow-hidden mt-8 max-h-[calc(100vh-200px)]'>

                    {/* Adjusted padding to standard pl-28 (7rem) which is close to your requested 27 */}
                    <div className="w-1/2 h-full flex flex-col justify-start pt-10 pl-28 pr-8 select-none overflow-y-auto">
                        <h2 className="text-4xl font-extralight text-white mb-10 select-none tracking-wide">
                            HOW IT WORKS
                        </h2>
                        
                        <div className="space-y-4">
                            {[
                                { num: 1, title: "BROWSE COLLECTION", desc: "Explore our curated selection of authentic mall pullouts from premium brands." },
                                { num: 2, title: "ADD TO CART", desc: "Select your desired items and add them to your shopping cart with ease." },
                                { num: 3, title: "CHECKOUT & PAY", desc: "Complete your order with secure payment options and provide delivery details." },
                                { num: 4, title: "FAST DELIVERY", desc: "Receive your premium fashion pieces delivered straight to your doorstep." }
                            ].map((step, idx) => (
                                <div key={idx} className="flex items-start group cursor-default">
                                    <div className="text-yellow-500 font-bold text-xl rounded-full border border-yellow-500/30 w-10 h-10 flex items-center justify-center mr-6 flex-shrink-0 group-hover:bg-yellow-500 group-hover:text-black transition-colors duration-300">
                                        {step.num}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors">{step.title}</h3>
                                        <p className="text-gray-400 text-base leading-relaxed max-w-md">
                                            {step.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: Vertical Carousel (50% Width) */}
                    <div className='w-1/2 h-full relative overflow-hidden bg-black/20'>
                        {loading ? (
                            <div className="w-full h-full flex items-center justify-center text-white text-xl tracking-widest animate-pulse">
                                LOADING COLLECTION...
                            </div>
                        ) : error ? (
                            <div className="w-full h-full flex items-center justify-center text-red-400">
                                UNABLE TO LOAD IMAGES
                            </div>
                        ) : (
                            // CAROUSEL TRACK
                            <div 
                                ref={trackRef}
                                id='image-track' 
                                className="w-3/4 flex flex-col gap-8 absolute left-1/2 top-1/2 will-change-transform cursor-grab active:cursor-grabbing" 
                                data-mouse-down-at="0" 
                                data-prev-percentage="-50" 
                                style={{ transform: 'translate(-50%, -50%)' }}
                            >
                                {products.map((product: any, index: number) => (
                                    <div
                                        key={index}
                                        className="relative w-full h-[50vh] overflow-hidden rounded-sm shadow-2xl flex-shrink-0 bg-zinc-800 group"
                                    >
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name || `Product ${index + 1}`}
                                            draggable="false"
                                            className="image w-full h-full object-cover scale-150 select-none grayscale group-hover:grayscale-0 transition-all duration-500"
                                            style={{ objectPosition: "50% 50%" }}
                                        />
                                        <div className="absolute bottom-4 left-4 text-white font-bold text-4xl drop-shadow-md z-10 opacity-60 group-hover:opacity-100 group-hover:text-yellow-400 transition-all duration-300">
                                            {product.name || "BRAND"}
                                        </div>
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