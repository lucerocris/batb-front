import { Route, Routes } from 'react-router';

import Cart from './pages/storefront/Cart';
import Landing from "@/app/pages/storefront/Landing.tsx";
import Browse from './pages/storefront/Browse';

export default function AppRouter() {
    return (
        <Routes>
            {/* STOREFRONT */}
            <Route 
                path="/" 
                element={<Landing />} 
            />
            <Route
                path="/browse"
                element={
                    <Browse />
                }
            />
            <Route
                path="/cart"
                element={
                    <Cart />
                }
            />
        </Routes>
    );
}
