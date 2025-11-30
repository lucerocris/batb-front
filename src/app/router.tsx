import { Route, Routes } from 'react-router';

import Cart from './pages/storefront/Cart';
import Landing from "./pages/storefront/Landing";
import Browse from './pages/storefront/Browse';
import ContactUs from './pages/storefront/ContactUs'

export default function AppRouter() {
    return (
        <Routes>
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
            <Route 
                path='/contact-us'
                element={
                    <ContactUs />
                }
            />
        </Routes>
    );
}
