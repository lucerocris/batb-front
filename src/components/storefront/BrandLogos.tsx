import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface BrandLogo {
    src: string;
    alt: string;
}

const brandLogos: BrandLogo[] = [
    { src: "/src/assets/storefront_assets/brandlogos/DKNY logo.png", alt: "DKNY" },
    { src: "/src/assets/storefront_assets/brandlogos/H&M logo.png", alt: "H&M" },
    { src: "/src/assets/storefront_assets/brandlogos/LEVI logo.png", alt: "LEVI" },
    { src: "/src/assets/storefront_assets/brandlogos/UNIQLO logo.png", alt: "UNIQLO" },
    { src: "/src/assets/storefront_assets/brandlogos/ZARA logo.png", alt: "ZARA" },
    { src: "/src/assets/storefront_assets/brandlogos/TH logo.png", alt: "TH" },
    { src: "/src/assets/storefront_assets/brandlogos/.png", alt: "NBA" },
    { src: "/src/assets/storefront_assets/brandlogos/.png", alt: "NEXT" },
];

export default function BrandLogos() {
    const settings = {
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: 'ease-in-out',
        pauseOnHover: true,
        arrows: false,
        dots: false,
        centerMode: true,
        centerPadding: '0px',
        variableWidth: false,
        lazyLoad: 'ondemand' as const
    };

    return (
        <div className='w-full h-full flex items-center justify-center p-4'>
            <div className='w-full'>
                <Slider {...settings}>
                    {brandLogos.map((logo, index) => (
                        <div key={index} className='px-4'>
                            <div className='flex justify-center items-center h-60'>
                                <img 
                                    src={logo.src} 
                                    alt={logo.alt} 
                                    className="h-auto w-auto object-contain hover:scale-110 transition-transform duration-300"
                                    style={{ 
                                        maxHeight: '200px', 
                                        maxWidth: '250px',
                                        filter: 'grayscale(100%)',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.target as HTMLImageElement).style.filter = 'grayscale(0%)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.target as HTMLImageElement).style.filter = 'grayscale(100%)';
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}