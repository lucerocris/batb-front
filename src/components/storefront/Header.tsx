import { useState, useEffect } from 'react';
import { MenuIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Sheet, SheetTrigger, SheetContent } from '../ui/sheet';

export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isInHeroSection, setIsInHeroSection] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroSectionHeight = window.innerHeight; // Assuming hero section is full viewport height
            
            // Check if we're still in the hero section
            setIsInHeroSection(currentScrollY < heroSectionHeight - 100);
            
            // Show header when scrolling up or at the top
            if (currentScrollY < lastScrollY || currentScrollY < 10) {
                setIsVisible(true);
            } else {
                // Hide header when scrolling down
                setIsVisible(false);
            }
            
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <motion.div 
            className="fixed top-0 left-0 w-full h-15 flex items-center px-4 z-50 transition-all duration-300"
            style={{
                backgroundColor: isInHeroSection ? 'transparent' : 'rgba(0, 0, 0, 0.6)',
                backdropFilter: isInHeroSection ? 'none' : 'blur(12px)',
                WebkitBackdropFilter: isInHeroSection ? 'none' : 'blur(12px)',
            }}
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}
        >
            <div>
                <img src="/src/assets/BATB%20Logo%201 (1).svg" alt="Logo" className="h-20 ml-5" />
            </div>
            <Sheet>
                <SheetTrigger asChild>
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
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0 bg-black bg-opacity-80 border-none backdrop-blur-lg [&>button]:hidden">
                    <div className="p-6">
                        <nav className="space-y-4">
                            <a href="#" className="block py-2 text-lg text-white hover:text-gray-600 transition-colors tracking-wide">
                                HOME
                            </a>
                            <a href="#" className="block py-2 text-lg text-white hover:text-gray-600 transition-colors tracking-wide">
                                BROWSE
                            </a>
                            <a href="#" className="block py-2 text-lg text-white hover:text-gray-600 transition-colors tracking-wide">
                                CART
                            </a>
                            <a href="#" className="block py-2 text-lg text-white hover:text-gray-600 transition-colors tracking-wide">
                                CONTACT
                            </a>
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </motion.div>
    );
}