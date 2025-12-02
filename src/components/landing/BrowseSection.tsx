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
            const nextPercentage = Math.max(-61, Math.min(nextPercentageUnclamped, 1
            ));

            track.dataset.percentage = String(nextPercentage);

            track.animate({
                transform: `translate(${nextPercentage}%, -30%)`
            }, { duration: 1200, fill: "forwards" });

            for(const image of track.getElementsByClassName("image")) {
                image.animate({
                    objectPosition: `50% ${100 + nextPercentage}%`
                }, { duration: 1200, fill: "forwards" });

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
                <div className='w-full h-full flex items-center justify-center px-7'>
                    {loading ? (
                        <div className="text-white text-2xl">LOADING</div>
                    ) : error ? (
                        <div className="text-red-400 text-5xl">ERROR LOADING IMAGES</div>
                    ) : (
                        <div id='image-track' className="flex gap-5 absolute left-0 top-1/2 select-none overflow-hidden" 
                        data-mouse-down-at="0" data-prev-percentage="0" style={{ transform: 'translate(0%, -30%)' }}>
                            {products.map((product: any, index: number) => (
                                <div
                                key={index}
                                className="w-[50vmin] h-[56vmin] overflow-hidden flex-shrink-0"
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
    );
}