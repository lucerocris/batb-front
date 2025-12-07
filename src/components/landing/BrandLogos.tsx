import Marquee from 'react-fast-marquee';

interface BrandLogo {
    src: string;
    alt: string;
}

const brandLogos: BrandLogo[] = [
    { src: "/assets/brandlogos/DKNY.svg", alt: "DKNY" },
    { src: "/assets/brandlogos/HM.svg", alt: "H&M" },
    { src: "/assets/brandlogos/LEVI.svg", alt: "LEVI" },
    { src: "/assets/brandlogos/UNIQLO.svg", alt: "UNIQLO" },
    { src: "/assets/brandlogos/ZARA.svg", alt: "ZARA" },
    { src: "/assets/brandlogos/TH.svg", alt: "TH" },
    { src: "/assets/brandlogos/NBA.svg", alt: "NBA" },
    { src: "/assets/brandlogos/NEXT.svg", alt: "NEXT" },
    { src: "/assets/brandlogos/BERSHKA.svg", alt: "BERSHKA" },
    { src: "/assets/brandlogos/BAPE.svg", alt: "BAPE" },
    { src: "/assets/brandlogos/COTTON ON.svg", alt: "COTTON ON" },
];

export default function BrandLogos() {
    return (
        <div className='w-full h-full flex items-center justify-center p-4 '>
            <Marquee 
                gradient={false} 
                speed={200} 
                pauseOnHover={true}>
                {brandLogos.map((logo, index) => (
                    <div key={index} className='px-1 h-75 w-auto flex items-center justify-center overflow-visible ml-20 ' >
                        <img
                            src={logo.src}
                            alt={logo.alt}
                            className="h-3/4 w-auto object-contain "
                            draggable='false'
                            style={{
                                maxWidth: '250px',
                                filter: 'grayscale(100%)',
                                transform: 'scale(1)',
                                transition: 'transform 300ms ease, filter 300ms ease',
                                transformOrigin: 'center center'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.filter = 'grayscale(0%)';
                                e.currentTarget.style.transform = 'scale(1.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.filter = 'grayscale(100%)';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        />
                    </div>
                ))}
            </Marquee>
        </div>
    );
}