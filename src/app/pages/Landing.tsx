import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import HeroSection from '../../components/landing/HeroSection';
import AboutSection from '../../components/landing/AboutSection';
import BrowseSection from '../../components/landing/BrowseSection';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Landing() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const sections = sectionsRef.current;
        let currentSection = 0;
        let isAnimating = false;

        gsap.set(sections, { y: 0 });

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();
            
            if (isAnimating) return;
            const direction = e.deltaY > 0 ? 1 : -1;
            const nextSection = currentSection + direction;
            if (nextSection < 0 || nextSection >= sections.length) return;
            
            isAnimating = true;
            gsap.to(window, {
                scrollTo: { y: nextSection * window.innerHeight, autoKill: false },
                duration: 1.2,
                ease: "power2.inOut",
                onComplete: () => {
                    currentSection = nextSection;
                    isAnimating = false;
                }
            });
        };

        const container = containerRef.current;
        container.addEventListener('wheel', handleWheel, { passive: false });

        const handleKeyDown = (e: KeyboardEvent) => {
            if (isAnimating) return;

            let direction = 0;
            if (e.key === 'ArrowDown' || e.key === 'PageDown') direction = 1;
            if (e.key === 'ArrowUp' || e.key === 'PageUp') direction = -1;

            if (direction === 0) return;

            const nextSection = currentSection + direction;
            if (nextSection < 0 || nextSection >= sections.length) return;

            isAnimating = true;
            gsap.to(window, {
                scrollTo: { y: nextSection * window.innerHeight, autoKill: false },
                duration: 1.2,
                ease: "power2.inOut",
                onComplete: () => {
                    currentSection = nextSection;
                    isAnimating = false;
                }
            });
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKeyDown);
            ScrollTrigger.killAll();
        };
    }, []);

    return (
        <div ref={containerRef} className="overflow-hidden select-none">
            <div 
                ref={(el) => { if (el) sectionsRef.current[0] = el; }}
                className="h-screen"
            >
                <HeroSection />
            </div>
            <div 
                ref={(el) => { if (el) sectionsRef.current[1] = el; }}
                className="h-screen"
            >
                <AboutSection />
            </div>
            <div 
                ref={(el) => { if (el) sectionsRef.current[2] = el; }}
                className="h-screen"
            >
                <BrowseSection />
            </div>
        </div>
    );
}