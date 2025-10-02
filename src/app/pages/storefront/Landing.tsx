import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import HeroSection from '../../../components/storefront/HeroSection';
import AboutSection from '../../../components/storefront/AboutSection';
import BrowseSection from '../../../components/storefront/BrowseSection';

export default function Landing() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <HeroSection />
            <AboutSection />
            <BrowseSection />
        </>
    );
}